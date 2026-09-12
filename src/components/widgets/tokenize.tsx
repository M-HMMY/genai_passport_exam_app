import { useState, type JSX } from 'react';

export const widgetId = 'tokenize';

/**
 * 文章がトークンに区切られる様子を見る道具。
 *
 * **本物のトークナイザではありません。**実際の区切り方はモデルごとに違い、
 * このアプリは外部と通信しないので、日本語の文字種の変わり目で区切る
 * 簡易な規則で「文字数とは一致しない」ことだけを体感させる。
 * その断りを画面にも出してある。
 *
 * ねらいは 1 つ。**生成 AI が正確な文字数の指定を苦手とする理由**
 * （文字を 1 つずつ数えているわけではない）を目で見せること。
 */

/** 文字の種類。同じ種類が続くあいだを 1 つのかたまりとして扱う */
function kindOf(ch: string): string {
  if (/[ぁ-ゟ]/.test(ch)) return 'hira';
  if (/[゠-ヿー]/.test(ch)) return 'kata';
  if (/[一-鿿]/.test(ch)) return 'kanji';
  if (/[A-Za-z]/.test(ch)) return 'latin';
  if (/[0-9０-９]/.test(ch)) return 'digit';
  if (/\s/.test(ch)) return 'space';
  return 'other';
}

/** 簡易な区切り。ひらがなは 2 文字ずつ、漢字は 1〜2 文字ずつに割る */
function split(text: string): string[] {
  const runs: { kind: string; text: string }[] = [];
  for (const ch of text) {
    const kind = kindOf(ch);
    const last = runs[runs.length - 1];
    if (last && last.kind === kind) last.text += ch;
    else runs.push({ kind, text: ch });
  }
  const out: string[] = [];
  for (const run of runs) {
    if (run.kind === 'space') continue;
    const size = run.kind === 'hira' ? 2 : run.kind === 'kanji' ? 2 : run.text.length;
    for (let i = 0; i < run.text.length; i += size) out.push(run.text.slice(i, i + size));
  }
  return out;
}

const SAMPLES = [
  '会議は午後 3 時に始まります。',
  '生成 AI は次に来そうな言葉を選んでいます。',
  'この文章をちょうど 100 文字で要約してください。',
];

export default function TokenizeWidget(): JSX.Element {
  const [text, setText] = useState(SAMPLES[0]);
  const tokens = split(text);
  const chars = [...text].filter((c) => !/\s/.test(c)).length;

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">文章がどう区切られるか見てみる</h4>
        <p className="widget-desc">
          生成 AI は文章を「トークン」という単位で扱います。一語全体のことも、単語の一部や 1 文字のこともあり、文字数とは一致しません。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '4em' }}>
          例文
        </span>
        <span className="chips">
          {SAMPLES.map((s, i) => (
            <button key={s} type="button" className="chip" onClick={() => setText(s)}>
              例 {i + 1}
            </button>
          ))}
        </span>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '4em' }}>
          文章
        </span>
        <input
          className="mono"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>

      <div className="widget-row">
        <span className="chips">
          {tokens.map((t, i) => (
            <span key={`${t}-${i}`} className="chip mono">
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="widget-out">
        <div className="out-item">
          <span className="out-label">文字数（空白を除く）</span>
          <span className="out-value">{chars}</span>
        </div>
        <div className="out-item">
          <span className="out-label">トークン数（目安）</span>
          <span className="out-value">{tokens.length}</span>
        </div>
      </div>

      <p className="widget-note">
        <strong>これは本物の区切り方ではありません。</strong>
        実際の区切り方はモデルごとに違い、このアプリは外部と通信しないため、
        ここでは文字の種類の変わり目で割る簡易な規則を使っています。
        <strong>見てほしいのは「文字数とトークン数が一致しない」という一点だけ</strong>です。
        <br />
        生成 AI が<strong>正確な文字数の指定を苦手とする</strong>のは、このためです。
        文章を文字数とは一致しないトークンの単位で扱っていて、文字を 1 つずつ数えているわけではありません。
        「ちょうど 100 文字で」と頼んでも、ぴったりにはなりにくいと考えてください。
      </p>
    </>
  );
}
