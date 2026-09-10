import { useState, type JSX } from 'react';

export const widgetId = 'phishing';

type Kind =
  | 'フィッシング詐欺'
  | 'スミッシング'
  | 'ヴィッシング'
  | 'スピアフィッシング'
  | 'ランサムウェア'
  | 'ソーシャルエンジニアリング攻撃';

const KINDS: Kind[] = [
  'フィッシング詐欺',
  'スミッシング',
  'ヴィッシング',
  'スピアフィッシング',
  'ランサムウェア',
  'ソーシャルエンジニアリング攻撃',
];

interface Item {
  text: string;
  answer: Kind;
  why: string;
}

/**
 * だましの手口を「何を使って」「誰を狙って」で見分ける道具。
 *
 * 名前が似ている手口が並ぶところなので、
 * **手段を表す名前（スミッシング・ヴィッシング）と、
 * 標的の絞り方を表す名前（スピアフィッシング）**が混ざる形にしてある。
 */
const ITEMS: Item[] = [
  {
    text: '宅配業者を装う SMS が届き、短縮 URL から偽の再配達サイトへ誘導された',
    answer: 'スミッシング',
    why: '手段が SMS（ショートメッセージ）なのでスミッシングです。SMS ＋ phishing の名前どおりです。',
  },
  {
    text: '銀行員を名乗る人物から電話があり、暗証番号を聞き出そうとされた',
    answer: 'ヴィッシング',
    why: '手段が音声通話なのでヴィッシングです。voice ＋ phishing。いったん切り、自分で調べた番号へかけ直します。',
  },
  {
    text: '実在の取引先の担当者名と進行中の案件名を使ったメールが、経理担当者だけに届いた',
    answer: 'スピアフィッシング',
    why: '特定の個人や組織に内容を合わせた狙い撃ちです。spear は銛。手段ではなく標的の絞り方を表す名前です。',
  },
  {
    text: '大手通販サイトを装うメールが不特定多数へ送られ、偽のログイン画面へ誘導された',
    answer: 'フィッシング詐欺',
    why: '広く一般の利用者を狙う総称としてのフィッシングです。スミッシングやヴィッシングは、この派生にあたります。',
  },
  {
    text: '社内のファイルが暗号化されて開けなくなり、復元と引き換えに金銭を要求された',
    answer: 'ランサムウェア',
    why: 'ransom は身代金。マルウェアの一種で、データを盗むだけでなく使えなくする点が特徴です。',
  },
  {
    text: '作業員を装った人物が事務所に入り、机の上の書類を撮影していった',
    answer: 'ソーシャルエンジニアリング攻撃',
    why: '技術ではなく人の心理や行動の隙を突く手口です。SNS を使う攻撃という意味ではありません。',
  },
  {
    text: '「拾った人はご自由に」と書かれた USB メモリが、休憩室に置かれていた',
    answer: 'ソーシャルエンジニアリング攻撃',
    why: '餌で釣るベイト攻撃で、ソーシャルエンジニアリング攻撃の一種です。bait は餌という意味です。',
  },
  {
    text: '「社内システムの担当です」と名乗る電話で、口実を作ってパスワードを聞き出された',
    answer: 'ソーシャルエンジニアリング攻撃',
    why: 'もっともらしい口実を作るプレテキストです。音声を使う点ではヴィッシングとも重なります。',
  },
];

export default function PhishingWidget(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Kind | null>(null);
  const [done, setDone] = useState(0);
  const [hit, setHit] = useState(0);

  const item = ITEMS[index];
  const correct = picked === item.answer;

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">だましの手口を見分けてみる</h4>
        <p className="widget-desc">
          場面を読んで、どの手口かを選んでください。「何を使って」「誰を狙って」の 2 点で見分けます。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '4em' }}>
          場面
        </span>
        <span className="mono">{item.text}</span>
      </div>

      <div className="widget-row">
        <span className="chips">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              disabled={picked !== null}
              onClick={() => {
                setPicked(k);
                setDone((n) => n + 1);
                if (k === item.answer) setHit((n) => n + 1);
              }}
            >
              {k}
            </button>
          ))}
        </span>
      </div>

      {picked !== null && (
        <>
          <div className="widget-out">
            <div className="out-item">
              <span className="out-label">{correct ? '正解' : 'ちがいます'}</span>
              <span className="out-value">{item.answer}</span>
            </div>
            <div className="out-item">
              <span className="out-label">ここまで</span>
              <span className="out-value">
                {hit} / {done}
              </span>
            </div>
          </div>
          <p className="widget-note">{item.why}</p>
          <div className="widget-row">
            <button
              type="button"
              className="chip"
              onClick={() => {
                setPicked(null);
                setIndex((i) => (i + 1) % ITEMS.length);
              }}
            >
              次の場面へ
            </button>
          </div>
        </>
      )}

      <p className="widget-note">
        <strong>軸が 2 つあります。</strong>
        <strong>スミッシングは SMS、ヴィッシングは音声通話</strong>という<strong>手段</strong>の名前。
        <strong>スピアフィッシングは特定の相手を狙う</strong>という<strong>標的の絞り方</strong>の名前です。
        軸が違うものを横に並べて覚えると取り違えます。
        <br />
        見分けるときに見るのは、ロゴや日本語の丁寧さではなく<strong>行動上の違和感</strong>です。
        急がせる、秘密を求める、連絡内のリンクや番号だけへ誘導する。
        <strong>届いた連絡の中の連絡先は使わず、自分で調べた窓口から確かめてください。</strong>
      </p>
    </>
  );
}
