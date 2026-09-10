import { useState, type JSX } from 'react';

export const widgetId = 'few-shot';

/**
 * Zero-Shot と Few-Shot の違いを、プロンプトの形で見比べる道具。
 *
 * **外部と通信しない。**出力は「例に形をそろえると、こう返りやすくなる」
 * という説明のために手で書いたもので、実際に生成させたものではない。
 * その断りを画面に出してある。
 */

interface Task {
  name: string;
  instruction: string;
  examples: { input: string; output: string }[];
  target: string;
  /** 例を見せない場合に返りやすい形 */
  zeroShot: string;
  /** 例を見せた場合に返りやすい形 */
  fewShot: string;
  note: string;
}

const TASKS: Task[] = [
  {
    name: '問い合わせの分類',
    instruction: '次の問い合わせを分類してください。',
    examples: [
      { input: '請求書の宛名を直したい', output: '請求' },
      { input: 'ログインできない', output: '技術' },
    ],
    target: '解約の手続きを知りたい',
    zeroShot:
      'この問い合わせは、契約内容の変更に関するものと考えられます。解約の手続きについては、契約担当の窓口での対応が適切でしょう。',
    fewShot: '契約',
    note: '例を 2 つ見せただけで、返ってくる形が「一語のラベル」にそろいました。分類のような作業では、形をそろえる効果が大きく出ます。',
  },
  {
    name: '社名から略称を作る',
    instruction: '次の会社名から、社内で使う略称を作ってください。',
    examples: [
      { input: '株式会社みらい物流サービス', output: 'みらい物流' },
      { input: '東西テクノロジー株式会社', output: '東西テクノ' },
    ],
    target: '合同会社さくら情報システム',
    zeroShot: '「さくら情報システム」または「さくらシステム」などが考えられます。用途に応じて選んでください。',
    fewShot: 'さくら情報',
    note: '「法人格を外し、6 文字前後にする」という規則を、言葉で説明せずに例だけで伝えられています。',
  },
];

export default function FewShotWidget(): JSX.Element {
  const [ti, setTi] = useState(0);
  const [shots, setShots] = useState(0);
  const task = TASKS[ti];

  const shown = task.examples.slice(0, shots);
  const prompt = [
    task.instruction,
    ...shown.map((e) => `入力：${e.input}\n出力：${e.output}`),
    `入力：${task.target}\n出力：`,
  ].join('\n\n');

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">Zero-Shot と Few-Shot を見比べてみる</h4>
        <p className="widget-desc">
          見せる例の数を変えると、プロンプトの形と、返ってきやすい答えの形が変わります。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '5em' }}>
          お題
        </span>
        <span className="chips">
          {TASKS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className="chip"
              style={{ fontWeight: ti === i ? 700 : 400 }}
              onClick={() => {
                setTi(i);
                setShots(0);
              }}
            >
              {t.name}
            </button>
          ))}
        </span>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '5em' }}>
          見せる例
        </span>
        <input
          className="slider"
          type="range"
          min={0}
          max={task.examples.length}
          value={shots}
          onChange={(e) => setShots(Number(e.target.value))}
        />
        <span className="mono" style={{ minWidth: '4em', textAlign: 'right' }}>
          {shots} 個
        </span>
      </div>

      <div className="widget-out">
        <div className="out-item">
          <span className="out-label">いまのやり方</span>
          <span className="out-value">{shots === 0 ? 'Zero-Shot' : 'Few-Shot'}</span>
        </div>
        <div className="out-item">
          <span className="out-label">Shot が意味するもの</span>
          <span className="out-value">見せる例の数</span>
        </div>
      </div>

      <pre className="code-block">
        <code>{prompt}</code>
      </pre>

      <table className="widget-table">
        <thead>
          <tr>
            <th>やり方</th>
            <th>返ってきやすい答えの形</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Zero-Shot（例なし）</td>
            <td>{task.zeroShot}</td>
          </tr>
          <tr>
            <td>Few-Shot（例あり）</td>
            <td className="mono">{task.fewShot}</td>
          </tr>
        </tbody>
      </table>

      <p className="widget-note">{task.note}</p>

      <p className="widget-note">
        <strong>Shot は「見せる例の数」です。</strong>
        Zero-Shot は例がゼロ、Few-Shot はいくつか見せます。名前から思い出せるようにしてください。
        <br />
        <strong>Few-Shot が常に優れているわけではありません。</strong>
        例を作る手間がかかりますし、<strong>偏った例や誤った例に出力が引きずられる</strong>こともあります。
        単純な依頼なら Zero-Shot のほうが手軽です。
        <br />
        <strong>この表の「返ってきやすい答え」は、説明のために手で書いたものです。</strong>
        このアプリは外部と通信しないため、実際に生成させた結果ではありません。
      </p>
    </>
  );
}
