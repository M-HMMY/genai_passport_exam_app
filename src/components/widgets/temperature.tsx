import { useState, type JSX } from 'react';

export const widgetId = 'temperature';

/**
 * Temperature と Top-p が「次の語の選ばれやすさ」をどう変えるかを見る道具。
 *
 * **この試験に数式は出ない**ので、式は一切出さない。
 * 見せたいのは向きだけ。
 *   Temperature … 上げると候補の差がならされて多様に、下げると上位に寄って無難に
 *   Top-p       … 下げると候補の範囲そのものが狭まる
 * 姉妹アプリと違い、値を計算させる問題は出ないため、棒の長さで体感させる。
 */

interface Candidate {
  word: string;
  base: number;
}

const CANDIDATES: Candidate[] = [
  { word: '始まります', base: 0.42 },
  { word: '終わります', base: 0.24 },
  { word: '変更になりました', base: 0.16 },
  { word: '中止です', base: 0.1 },
  { word: '延期されました', base: 0.05 },
  { word: '楽しかったです', base: 0.03 },
];

/** 温度で候補の差をならす。高いほど差が小さくなる */
function applyTemperature(list: Candidate[], t: number): number[] {
  // 累乗で差の付き方を変える。t が小さいほど上位に寄り、大きいほど平らになる
  const raw = list.map((c) => Math.pow(c.base, 1 / Math.max(t, 0.1)));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / sum);
}

export default function TemperatureWidget(): JSX.Element {
  const [temp, setTemp] = useState(1);
  const [topP, setTopP] = useState(1);

  const scores = applyTemperature(CANDIDATES, temp);

  // Top-p: 上位から足していき、合計が p に達するまでを候補に残す
  const order = scores.map((v, i) => ({ i, v })).sort((a, b) => b.v - a.v);
  const kept = new Set<number>();
  let acc = 0;
  for (const { i, v } of order) {
    kept.add(i);
    acc += v;
    if (acc >= topP) break;
  }

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">Temperature と Top-p を動かしてみる</h4>
        <p className="widget-desc">
          「会議は午後 3 時に」の続きとして、どの言葉が選ばれやすいかを棒の長さで表しています。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '8em' }}>
          Temperature
        </span>
        <input
          className="slider"
          type="range"
          min={0.1}
          max={2}
          step={0.1}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
        />
        <span className="mono" style={{ minWidth: '3em', textAlign: 'right' }}>
          {temp.toFixed(1)}
        </span>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '8em' }}>
          Top-p
        </span>
        <input
          className="slider"
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={topP}
          onChange={(e) => setTopP(Number(e.target.value))}
        />
        <span className="mono" style={{ minWidth: '3em', textAlign: 'right' }}>
          {topP.toFixed(2)}
        </span>
      </div>

      <table className="widget-table">
        <thead>
          <tr>
            <th>次に来る候補</th>
            <th>選ばれやすさ</th>
            <th>Top-p の範囲</th>
          </tr>
        </thead>
        <tbody>
          {CANDIDATES.map((c, i) => (
            <tr key={c.word}>
              <td>{c.word}</td>
              <td>
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    height: '0.7em',
                    width: `${Math.round(scores[i] * 100)}%`,
                    minWidth: '2px',
                    background: 'var(--accent)',
                    verticalAlign: 'middle',
                  }}
                />
                <span className="mono"> {Math.round(scores[i] * 100)} %</span>
              </td>
              <td>{kept.has(i) ? '候補に残る' : '外れる'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="widget-out">
        <div className="out-item">
          <span className="out-label">候補に残っている数</span>
          <span className="out-value">
            {kept.size} / {CANDIDATES.length}
          </span>
        </div>
        <div className="out-item">
          <span className="out-label">いまの傾向</span>
          <span className="out-value">{temp <= 0.6 ? '無難' : temp >= 1.4 ? '多様' : 'ふつう'}</span>
        </div>
      </div>

      <p className="widget-note">
        <strong>Temperature を下げると</strong>、上位の候補に大きく寄って、
        無難で決まりきった出力になります。<strong>上げると</strong>差がならされ、
        低めの候補にも出番が増えて多様になります。
        <br />
        <strong>Top-p を下げると</strong>、上位のいくつかで合計に達するため、
        <strong>候補の範囲そのものが狭まります</strong>。表のいちばん右の列を見てください。
        <br />
        <strong>2 つはねらいが似ていますが、別の設定です。</strong>
        Temperature は<strong>選ばれやすさの差</strong>を、Top-p は
        <strong>候補に残す範囲</strong>を変えます。
        <br />
        ここでの数値は、向きを体感するための作り物です。
        <strong>この試験に数式は出ません。</strong>値の大小と挙動の向きだけを覚えてください。
      </p>
    </>
  );
}
