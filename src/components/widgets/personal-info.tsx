import { useState, type JSX } from 'react';

export const widgetId = 'personal-info';

type Kind = '個人情報' | '個人識別符号' | '要配慮個人情報' | '匿名加工情報' | 'どれでもない';

const KINDS: Kind[] = ['個人情報', '個人識別符号', '要配慮個人情報', '匿名加工情報', 'どれでもない'];

interface Item {
  text: string;
  answer: Kind;
  why: string;
}

/**
 * 「どこからが個人情報か」を、例を分類しながら覚える道具。
 *
 * この試験は用語の取り違えで落とすので、定義を読むより
 * **判断に迷う例を並べて、線を引く練習**をするほうが効く。
 * 例は g-privacy-1 の本文と対応させてある。
 */
const ITEMS: Item[] = [
  {
    text: '氏名と生年月日が書かれた名簿',
    answer: '個人情報',
    why: '特定の個人を識別できるため個人情報です。ただし、それ自体は個人識別符号ではありません。',
  },
  {
    text: 'マイナンバー',
    answer: '個人識別符号',
    why: '公的に割り当てられた符号で、それだけで個人を識別できます。個人識別符号を含む情報は個人情報にもなります。',
  },
  {
    text: '一定の基準を満たす顔認識データ',
    answer: '個人識別符号',
    why: '身体の特徴を機械用に変換した符号です。人物が写った顔写真そのものは個人情報ですが、この符号ではありません。',
  },
  {
    text: '人物が写っていると分かる顔写真',
    answer: '個人情報',
    why: '写っている人物を識別できるため個人情報です。顔に関するものがすべて個人識別符号になるわけではありません。',
  },
  {
    text: '社員番号だけの一覧。人事台帳とすぐ照合できる',
    answer: '個人情報',
    why: 'ほかの情報と容易に照合して識別できるものも個人情報に含まれます。名前が書いてあるかだけでは決まりません。',
  },
  {
    text: '健康診断の結果',
    answer: '要配慮個人情報',
    why: '法令で定められた、特に慎重な取り扱いが必要な情報です。原則として、あらかじめ本人の同意を得ずに取得できません。',
  },
  {
    text: '犯罪の経歴',
    answer: '要配慮個人情報',
    why: '人種・信条・社会的身分・病歴などと並ぶ代表例です。取得の時点から特別な配慮が必要になります。',
  },
  {
    text: '特定の個人を識別できず、元にも戻せないよう加工した購買履歴',
    answer: '匿名加工情報',
    why: '識別できないようにし、かつ復元もできないようにしたものです。「復元できない」が要件に入っています。',
  },
  {
    text: '氏名だけを黒く塗り、珍しい勤務先と生年月日が残った一覧',
    answer: '個人情報',
    why: '残った項目の組合せから個人を推測できるため、匿名加工情報にはあたりません。マスキングは手段の 1 つにすぎません。',
  },
  {
    text: '昨年の全社の平均残業時間',
    answer: 'どれでもない',
    why: '特定の個人に関する情報ではなく、集計された統計です。個人情報保護法が扱う個人情報にはあたりません。',
  },
  {
    text: '亡くなった本人だけに関する情報',
    answer: 'どれでもない',
    why: '個人情報の定義は「生存する個人」に関する情報です。ただし遺族の情報にもなる場合や、別の規程で守られる場合はあります。',
  },
];

export default function PersonalInfoWidget(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Kind | null>(null);
  const [done, setDone] = useState(0);
  const [hit, setHit] = useState(0);

  const item = ITEMS[index];
  const correct = picked === item.answer;

  const next = (): void => {
    setPicked(null);
    setIndex((i) => (i + 1) % ITEMS.length);
  };

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">どこからが個人情報か、分類してみる</h4>
        <p className="widget-desc">
          例を読んで、どれに当たるかを選んでください。判断に迷う例をわざと集めてあります。
        </p>
      </div>

      <div className="widget-row">
        <span className="widget-field" style={{ minWidth: '4em' }}>
          例
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
            <button type="button" className="chip" onClick={next}>
              次の例へ
            </button>
          </div>
        </>
      )}

      <p className="widget-note">
        <strong>覚え方は 3 点です。</strong>
        個人情報は「<strong>生存する</strong>個人」で「<strong>容易に照合できるもの</strong>も含む」。
        個人識別符号は「身体の特徴を変換した符号」と「公的な番号」の<strong>両方</strong>。
        要配慮個人情報は<strong>取得の時点で本人の同意が要る</strong>点が他と違います。
      </p>
    </>
  );
}
