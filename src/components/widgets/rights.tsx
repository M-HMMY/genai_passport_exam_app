import { useState, type JSX } from 'react';

export const widgetId = 'rights';

type Kind = '著作権' | '特許権' | '意匠権' | '商標権' | '肖像権' | 'パブリシティ権' | '不正競争防止法';

const KINDS: Kind[] = ['著作権', '特許権', '意匠権', '商標権', '肖像権', 'パブリシティ権', '不正競争防止法'];

interface Item {
  text: string;
  answer: Kind;
  why: string;
}

/**
 * 「どの権利の話か」を、例を分類しながら覚える道具。
 *
 * 意匠と商標、肖像権とパブリシティ権のように、
 * **名前が近くて守るものが違う**組を並べてある。h-rights の本文と対応。
 */
const ITEMS: Item[] = [
  {
    text: '自分で書いた小説の文章',
    answer: '著作権',
    why: '思想や感情を創作的に表現したものです。登録しなくても、創作した時点で自動的に発生します。',
  },
  {
    text: '新しい製造方法の発明',
    answer: '特許権',
    why: '特許権が守るのは発明です。出願して登録されて初めて発生し、原則として出願から 20 年です。',
  },
  {
    text: '椅子の新しい形のデザイン',
    answer: '意匠権',
    why: '意匠権が守るのは物のデザインです。商品の名前やロゴを守る商標権と取り違えないでください。',
  },
  {
    text: '商品のロゴマーク',
    answer: '商標権',
    why: '商標権が守るのは商品やサービスの目印です。更新登録を繰り返せる点も、他の産業財産権と違います。',
  },
  {
    text: '街で撮られた自分の顔写真を、無断で広告に使われた',
    answer: '肖像権',
    why: 'みだりに容姿を撮影・公表されない人格的な権利です。明文の規定ではなく、判例で認められてきました。',
  },
  {
    text: '有名俳優の名前を無断で使い、商品の売上を伸ばそうとした',
    answer: 'パブリシティ権',
    why: '氏名や肖像が持つ顧客吸引力に関する財産的な権利です。人格的な肖像権とは性質が違います。',
  },
  {
    text: '秘密として管理されている顧客名簿を、退職者が持ち出した',
    answer: '不正競争防止法',
    why: '営業秘密の侵害として扱われます。秘密管理性・有用性・非公知性の 3 要件がそろって営業秘密になります。',
  },
  {
    text: '会社が費用をかけて集め、特定の取引先へ提供しているデータ',
    answer: '不正競争防止法',
    why: '限定提供データとして保護されうるものです。営業秘密と違い、非公知性は要件になっていません。',
  },
  {
    text: '撮影した写真そのもの',
    answer: '著作権',
    why: '写真も著作物です。写っている人物との関係では肖像権も問題になるため、権利が重なることがあります。',
  },
  {
    text: 'ペットボトルの独特な容器の形状',
    answer: '意匠権',
    why: '物のデザインなので意匠権の対象になりえます。その形状が目印として働く場合、商標の論点も重なります。',
  },
];

export default function RightsWidget(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Kind | null>(null);
  const [done, setDone] = useState(0);
  const [hit, setHit] = useState(0);

  const item = ITEMS[index];
  const correct = picked === item.answer;

  return (
    <>
      <div className="widget-head">
        <h4 className="widget-title">どの権利の話か、分類してみる</h4>
        <p className="widget-desc">
          守るものが近い権利を並べてあります。「何を守る権利か」で選んでください。
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
            <button
              type="button"
              className="chip"
              onClick={() => {
                setPicked(null);
                setIndex((i) => (i + 1) % ITEMS.length);
              }}
            >
              次の例へ
            </button>
          </div>
        </>
      )}

      <p className="widget-note">
        <strong>地図で覚えてください。</strong>
        知的財産権の下に、<strong>創作した時点で自動的に発生する著作権</strong>と、
        <strong>登録して初めて発生する産業財産権</strong>（特許権・実用新案権・意匠権・商標権）があります。
        肖像権とパブリシティ権はそこに含まれず、<strong>判例で認められてきた権利</strong>です。
        不正競争防止法は別枠で、営業秘密や限定提供データを扱います。
        <br />
        <strong>1 つの例に複数の権利が重なることもあります。</strong>ここでは中心になる権利を答えにしています。
      </p>
    </>
  );
}
