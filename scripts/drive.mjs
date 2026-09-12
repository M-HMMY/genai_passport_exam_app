// 開発サーバのアプリを、実際にブラウザで開いて操作する。
//
// なぜこれが要るか：`npm run check` は React で描画までするが、それは
// 「描ける」ことしか見ていない。クリックしたとき何が起きるかは見ていない。
// このスクリプトを書いたことで、確認問題の解答が学習記録へ二重登録される
// 不具合が実際に見つかった（Practice.tsx で actions.answer を setSession の
// 更新関数の中で呼んでいた。StrictMode では更新関数が 2 回走る）。
// 検査でもビルドでも型でも捕まらない種類の不具合で、押してみるしかなかった。
//
// なぜ Playwright を入れないか：このリポジトリの方針が「ランタイム依存は
// React だけ」なので、開発用でも重い依存は足したくない。Node 24 には
// WebSocket が組み込みで入っているため、Chrome DevTools Protocol へ
// 直接つなげば追加インストールなしで済む。Edge は Windows に最初からある。
//
// 使い方：
//   1. 別の端末で `npm run dev` を起動しておく
//   2. node scripts/drive.mjs
//
// 別の画面を見たいときは、いちばん下の「筋書き」だけ書き換える。

import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;
const BASE = 'http://localhost:5173';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Edge を headless で起動して DevTools につなぐ ---

const profile = mkdtempSync(join(tmpdir(), 'drive-'));
const edge = spawn(
  EDGE,
  [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    // 使い捨てのプロファイルにしないと、ふだん使いの Edge が開いているときに
    // 起動が奪われて DevTools につながらない。
    `--user-data-dir=${profile}`,
    '--no-first-run',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function debuggerUrl() {
  // 起動直後は /json/list がまだ応答しない。数秒ぶんだけ待つ。
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* まだ起動中 */
    }
    await sleep(250);
  }
  throw new Error('DevTools につながらなかった。Edge のパスを確かめること');
}

const ws = new WebSocket(await debuggerUrl());
await new Promise((r) => (ws.onopen = r));

let id = 0;
const waiting = new Map();
const errors = [];

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && waiting.has(msg.id)) {
    waiting.get(msg.id)(msg);
    waiting.delete(msg.id);
    return;
  }
  // 画面は出ているのにコンソールだけ荒れている、という状態を見逃さないため、
  // 例外と console.error を拾っておく。React の警告もここに出る。
  if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails.text);
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    errors.push(msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
  }
};

function send(method, params = {}) {
  const n = ++id;
  ws.send(JSON.stringify({ id: n, method, params }));
  return new Promise((r) => waiting.set(n, r));
}

async function evaluate(expression) {
  const res = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (res.result?.exceptionDetails) {
    throw new Error(JSON.stringify(res.result.exceptionDetails));
  }
  return res.result?.result?.value;
}

// --- 操作のことば ---

/** ハッシュルータなので、location.hash を書き換えれば画面が変わる。 */
async function go(hash) {
  await evaluate(`location.hash = ${JSON.stringify(hash)}`);
  await sleep(700);
}

/** いま画面に出ている文字。空行を潰して読みやすくする。 */
function visible() {
  return evaluate(
    `(() => {
       const t = document.querySelector('.page')?.innerText ?? document.body.innerText;
       return t.replace(/\\n{2,}/g, '\\n').trim();
     })()`,
  );
}

/**
 * 文字で要素を探して押す。セレクタではなく見えている文字で指すのは、
 * 画面の作りが変わっても筋書きを書き直さずに済むため。
 * 見つからなければ 'NOT_FOUND' が返る（例外にしない。押せなかったこと自体が結果）。
 */
function click(text, tag = 'button') {
  return evaluate(
    `(() => {
       const els = [...document.querySelectorAll(${JSON.stringify(tag)})];
       const el = els.find((e) => e.innerText.trim().includes(${JSON.stringify(text)}));
       if (!el) return 'NOT_FOUND';
       el.click();
       return 'OK';
     })()`,
  );
}

/** 選択肢（ア〜エ）の n 番目を押す。確認問題と模試で使う。 */
function choose(n) {
  return evaluate(
    `(() => {
       const b = [...document.querySelectorAll('button')]
         .filter((x) => /^[アイウエ]/.test(x.innerText.trim()));
       if (!b[${n}]) return 'NO_CHOICES';
       b[${n}].click();
       return 'OK';
     })()`,
  );
}

/** いま選択されている選択肢の数。単一選択と複数選択の違いはここに出る。 */
function selectedCount() {
  return evaluate(`document.querySelectorAll('.choice.selected').length`);
}

/** いま出ている問題が複数選択かどうか。画面のタグで見る。 */
function isMulti() {
  return evaluate(`document.querySelector('.tag-multi') !== null`);
}

const report = [];
const show = (title, body) => report.push(`\n===== ${title} =====\n${body}`);

// ============================================================
// 筋書き — ここだけ書き換えて使う
// ============================================================

await send('Page.enable');
await send('Runtime.enable');
await evaluate(`location.href = ${JSON.stringify(BASE + '/#/home')}`);
await sleep(1500);

// 1. 教本の節が出るか。
await go('#/textbook/g-privacy-1');
show('教本 g-privacy-1', (await visible()).slice(0, 300));

// 2. 複数選択：押すたびに入り切りし、2 つ同時に選べること。
//
//    **出題の前に必ずホームを経由すること。**Practice は画面を離れても
//    セッションを持ったままなので、`#/practice?...` へ直接飛ぶと
//    前の出題が続いてしまい、別の章を指定したつもりで前の章を解き続ける
//    （これで一度、複数選択の問題に当たらず調べ直した）。
await go('#/home');
await evaluate(`location.href = ${JSON.stringify(BASE + '/#/practice?section=k-prompt-2')}`);
await sleep(1000);
await click('開始');
await sleep(700);

let found = false;
for (let i = 0; i < 6; i++) {
  if (await isMulti()) {
    found = true;
    break;
  }
  await choose(0);
  await click('解答する');
  await sleep(400);
  if ((await click('次の問題')) === 'NOT_FOUND') break;
  await sleep(400);
}

if (!found) {
  show('複数選択', '**複数選択の問題に当たらなかった。**出題の抽選か、収録を確かめること');
} else {
  show('複数選択の出題', (await visible()).slice(0, 400));
  await choose(1);
  await choose(3);
  await sleep(250);
  const both = await selectedCount();
  await choose(3); // もう一度押して外れるか（トグルになっているか）
  await sleep(250);
  const afterToggle = await selectedCount();
  await choose(3);
  await sleep(250);
  show('複数選択の操作', `2 つ押した後 ${both} 個（2 であること） / もう一度押した後 ${afterToggle} 個（1 であること）`);
  await click('解答する');
  await sleep(600);
  show('複数選択の採点', (await visible()).slice(0, 600));
}

// 3. 単一選択：押し直したら「置き換わる」こと。
//    ここが壊れると、押すたびに選択が増えて別の問題形式になってしまう。
await go('#/home');
await evaluate(`location.href = ${JSON.stringify(BASE + '/#/practice?cat=a-ai')}`);
await sleep(1000);
await click('開始');
await sleep(700);
await choose(0);
await choose(1);
await sleep(250);
show('単一選択で 2 回押した', `選択中 ${await selectedCount()} 個（1 個であること）`);
await click('解答する');
await sleep(600);
show('単一選択の採点', (await visible()).slice(0, 300));

// 4. 模試。解答の持ち方を 1 問ごとの配列にしたので、
//    「解答済み N / M」の数え方と採点がそのまま動くかを見る。
await go('#/home');
await go('#/mock');
await click('短縮');
await sleep(400);
await click('開始');
await sleep(900);
await choose(0);
await sleep(300);
show('模試で 1 問選んだ', (await visible()).slice(0, 120));
await click('採点する');
await sleep(900);
show('模試の採点', (await visible()).slice(0, 400));

// 5. 体験ツールの一覧。
await go('#/tools');
show('体験ツール', (await visible()).slice(0, 250));

// ============================================================

show('コンソールエラー', errors.length ? errors.join('\n') : '(なし)');
console.log(report.join('\n'));
