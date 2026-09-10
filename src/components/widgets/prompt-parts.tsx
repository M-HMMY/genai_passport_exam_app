import { useState, type JSX } from 'react';

export const widgetId = 'prompt-parts';

/**
 * プロンプトの 4 要素を、実際に組み立てて確かめる道具。
 *
 * **外部と通信しない。**生成 AI へ送る機能は作らない方針なので、
 * 「組み立てたプロンプトの文面」までを見せて終わる。
 * ねらいは Instruction と Output Indicator の取り違えを潰すこと。
 */

interface Part {
  key: 'instruction' | 'context' | 'input' | 'output';
  label: string;
  en: string;
  role: string;
  options: { name: string; text: string }[];
}

const PARTS: Part[] = [
  {
    key: 'instruction',
    label: '指示',
    en: 'Instruction',
    role: 'してほしい作業を決める',
    options: [
      { name: '要約する', text: '次の会議メモを要約してください。' },
      { name: '校正する', text: '次の文章を校正してください。' },
      { name: '箇条書きにする', text: '次の文章を箇条書きに変換してください。' },
    ],
  },
  {
    key: 'context',
    label: '文脈・背景',
    en: 'Context',
    role: '読み手と目的を決める',
    options: [
      { name: '部長向け', text: '部長が短時間で進捗と問題点を把握するために使います。' },
      { name: '新入社員向け', text: '入社したばかりの社員が読むので、専門用語は避けてください。' },
      { name: '指定しない', text: '' },
    ],
  },
  {
    key: 'input',
    label: '入力データ',
    en: 'Input Data',
    role: '処理する材料を渡す',
    options: [
      {
        name: '会議メモ',
        text: '会議メモ：\n新商品の試作品は完成。利用者テストは来週実施予定。\n梱包材の納入が遅れる見込みで、発売日への影響を確認中。',
      },
      { name: '短い文章', text: '対象の文章：\n本日は貴重なお時間を頂戴し誠にありがとうございました。' },
    ],
  },
  {
    key: 'output',
    label: '出力形式の指定',
    en: 'Output Indicator',
    role: '返答の形を決める',
    options: [
      { name: '3 見出し・各 1 文', text: '「進捗」「問題点」「次の対応」の 3 見出しを付け、各 1 文で出力してください。' },
      { name: '箇条書き 3 点', text: '箇条書きで 3 点にまとめてください。' },
      { name: '指定しない', text: '' },
    ],
  },
];

export default function PromptPartsWidget(): JSX.Element {
  const [picked, setPicked] = useState<Record<string, number>>({
    instruction: 0,
    context: 0,
    input: 0,
    output: 0,
  });

  const lines = PARTS.map((p) => p.options[picked[p.key]].text).filter((t) => t !== '');
  const used = PARTS.filter((p) => p.options[picked[p.key]].text !== '').length;

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">プロンプトを 4 要素から組み立ててみる</h4>
        <p className="widget-desc">
          それぞれの要素を選ぶと、下に組み上がった文面が出ます。どの部分がどの要素かを目で覚えてください。
        </p>
      </div>

      {PARTS.map((p) => (
        <div className="widget-row" key={p.key}>
          <span className="widget-field" style={{ minWidth: '10em' }}>
            {p.en}（{p.label}）
          </span>
          <span className="chips">
            {p.options.map((o, i) => (
              <button
                key={o.name}
                type="button"
                className="chip"
                style={{ fontWeight: picked[p.key] === i ? 700 : 400 }}
                onClick={() => setPicked((s) => ({ ...s, [p.key]: i }))}
              >
                {o.name}
              </button>
            ))}
          </span>
        </div>
      ))}

      <table className="widget-table">
        <thead>
          <tr>
            <th>要素</th>
            <th>役割</th>
            <th>いま選んでいるもの</th>
          </tr>
        </thead>
        <tbody>
          {PARTS.map((p) => (
            <tr key={`${p.key}-row`}>
              <td>
                {p.en}
                <br />
                {p.label}
              </td>
              <td>{p.role}</td>
              <td>{p.options[picked[p.key]].name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="widget-out">
        <div className="out-item">
          <span className="out-label">使っている要素</span>
          <span className="out-value">{used} / 4</span>
        </div>
      </div>

      <pre className="code-block">
        <code>{lines.join('\n\n')}</code>
      </pre>

      <p className="widget-note">
        <strong>Instruction と Output Indicator の取り違えが、いちばん多い誤りです。</strong>
        「文章を要約する」は<strong>してほしい作業</strong>なので Instruction、
        「3 見出しを付け、各 1 文で」は<strong>返答の形</strong>なので Output Indicator です。
        <br />
        <strong>4 要素をすべて入れる必要はありません。</strong>
        「指定しない」を選ぶと要素が減ります。目的と材料が明らかなら、短いプロンプトで足ります。
        長ければよいのではなく、<strong>必要な手掛かりがあること</strong>が大切です。
        <br />
        <strong>このアプリは外部と通信しません。</strong>
        組み上がった文面は、読んで覚えるためのものです。生成 AI へ送る機能はありません。
      </p>
    </>
  );
}
