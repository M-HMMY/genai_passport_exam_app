import { useState, type JSX } from 'react';

export const widgetId = 'attention';

/**
 * Self-Attention が「どの語とどの語を結び付けるか」を見る道具。
 *
 * **重みは実際のモデルから取ったものではなく、手で書いた例**である。
 * 見せたいのは「離れた語どうしを直接つなげられる」という一点だけ。
 * 数式は出さない（この試験に数式は出ない）。
 */

interface Sentence {
  name: string;
  words: string[];
  /** 注目する語の位置 → 関係の強さ（0〜1）の並び */
  weights: Record<number, number[]>;
  note: string;
}

const SENTENCES: Sentence[] = [
  {
    name: '「それ」は何を指すか',
    words: ['田中さんは', '傘を', '持った', '。', 'それは', '青かった'],
    weights: {
      4: [0.15, 0.62, 0.08, 0.02, 0.05, 0.08],
      5: [0.06, 0.48, 0.05, 0.02, 0.31, 0.08],
      0: [0.4, 0.12, 0.3, 0.02, 0.08, 0.08],
    },
    note: '「それは」から見ると、「傘を」との関係がいちばん強くなっています。離れていても直接つながります。',
  },
  {
    name: '主語と動詞の対応',
    words: ['昨日', '会議で', '部長が', '資料を', '配った'],
    weights: {
      4: [0.08, 0.12, 0.42, 0.3, 0.08],
      2: [0.06, 0.2, 0.3, 0.14, 0.3],
      3: [0.05, 0.1, 0.18, 0.33, 0.34],
    },
    note: '「配った」から見ると、「部長が」と「資料を」の関係が強くなります。誰が何をしたかを結び付けています。',
  },
];

export default function AttentionWidget(): JSX.Element {
  const [si, setSi] = useState(0);
  const sentence = SENTENCES[si];
  const focusable = Object.keys(sentence.weights).map(Number).sort((a, b) => a - b);
  const [focus, setFocus] = useState(focusable[0]);

  const current = sentence.weights[focus] ?? sentence.words.map(() => 0);
  const max = Math.max(...current);

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">どの語に注目しているかを見てみる</h4>
        <p className="widget-desc">
          注目する語を選ぶと、その語が文の中のどこと強く関係しているかが、色の濃さで見えます。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '4em' }}>
          例文
        </span>
        <span className="chips">
          {SENTENCES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className="chip"
              onClick={() => {
                setSi(i);
                setFocus(Object.keys(SENTENCES[i].weights).map(Number).sort((a, b) => a - b)[0]);
              }}
            >
              {s.name}
            </button>
          ))}
        </span>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '6em' }}>
          注目する語
        </span>
        <span className="chips">
          {focusable.map((i) => (
            <button key={i} type="button" className="chip" onClick={() => setFocus(i)}>
              {sentence.words[i]}
            </button>
          ))}
        </span>
      </div>

      <div className="widget-row">
        <span className="chips">
          {sentence.words.map((w, i) => {
            const strength = max > 0 ? current[i] / max : 0;
            return (
              <span
                key={`${w}-${i}`}
                className="chip mono"
                style={{
                  background: `color-mix(in srgb, var(--accent-soft) ${Math.round(strength * 100)}%, transparent)`,
                  fontWeight: i === focus ? 700 : 400,
                }}
              >
                {w}
              </span>
            );
          })}
        </span>
      </div>

      <table className="widget-table">
        <thead>
          <tr>
            <th>語</th>
            <th>「{sentence.words[focus]}」との関係の強さ</th>
          </tr>
        </thead>
        <tbody>
          {sentence.words.map((w, i) => (
            <tr key={`${w}-row-${i}`}>
              <td>{w}</td>
              <td>
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    height: '0.7em',
                    width: `${Math.round(current[i] * 100)}%`,
                    minWidth: '2px',
                    background: 'var(--accent)',
                    verticalAlign: 'middle',
                  }}
                />
                <span className="mono"> {Math.round(current[i] * 100)} %</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="widget-note">{sentence.note}</p>

      <p className="widget-note">
        <strong>これが Self-Attention（自己注意力）です。</strong>
        Self は「自分自身」の意味で、<strong>同じ文の中を互いに見合って</strong>、
        どの語とどの語が関係しているかを見つけます。
        <br />
        RNN のように前から順に伝言を渡す形だと、離れた語の関係は薄れていきました。
        Attention は<strong>離れた語どうしを直接結び付けられる</strong>ため、長い文でも関係を保てます。
        <br />
        <strong>ここに出した数値は、説明のために手で書いた例です。</strong>
        実際のモデルの値ではありません。覚えるのは「どこに注目するかを重みで決める」という考え方だけで十分です。
      </p>
    </>
  );
}
