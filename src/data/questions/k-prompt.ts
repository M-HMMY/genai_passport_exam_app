import type { Question } from '../../types';

/**
 * 第 5 章 プロンプト：LLM とプロンプトの基礎（categoryId: 'k-prompt'）の確認問題。
 * sectionId は必ず付ける（解説から教本へ戻る導線に使う）。
 */
export const kPromptQuestions: Question[] = [
  {
    id: 'k-prompt-q01',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-1',
    question: 'LM（言語モデル）の説明として、適切なものはどれか。',
    choices: [
      '言葉の並び方を学び、文脈からその位置に来る言葉を確率で予測する仕組み',
      '入力された文章の意味を理解し、辞書と照合して正誤を判定する仕組み',
      '複数の言語の対訳を記憶し、単語ごとに置き換える仕組み',
      '文章に含まれる誤字を検出し、自動で修正する専用の仕組み',
    ],
    answer: 0,
    explanation:
      'アが正しい。「冷蔵庫を開けて、牛乳を」と続けば「飲んだ」は来そうで「泳いだ」は来そうにない、という見積もりを繰り返します。長文を一度に思いついているのではなく、一歩ずつ続きを選んでいます。イは辞書照合、ウは対訳置換、エは校正ツールの説明であり、いずれも言語モデルの仕組みではありません。',
    level: 1,
  },
  {
    id: 'k-prompt-q02',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-1',
    question: 'n-gram モデルの説明として、適切なものはどれか。',
    choices: [
      '次の語を n 個まとめて出力するモデルである',
      '文章全体を読み込んでから、最も適切な語を選ぶモデルである',
      '直前の n − 1 語だけを見て、次の 1 語を予測するモデルである',
      'n 種類の言語を切り替えて処理できるモデルである',
    ],
    answer: 2,
    explanation:
      'ウが正しい。3-gram なら直前の 2 語を見ます。仕組みは分かりやすい一方、もっと前に出た主語や話題を見られない点が弱点で、そこをニューラル言語モデルが広げました。アは n を出力語数と取り違えた定番の誤りです。イは見る範囲が広すぎます。エは n を言語の数とした誤りです。',
    level: 2,
  },
  {
    id: 'k-prompt-q03',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-1',
    question: 'LM と LLM の関係として、適切なものはどれか。',
    choices: [
      'LLM は LM とはまったく別の仕組みで、続きを予測する考え方を使わない',
      'LLM は LM の考え方を、非常に多くのデータと大きな計算規模で作ったものである',
      'LM は LLM を軽量化したもので、後から作られた新しい方式である',
      'LM は文章を扱い、LLM は画像だけを扱うという違いがある',
    ],
    answer: 1,
    explanation:
      'イが正しい。文章を生成する LLM では、文脈から続きを予測する基本は同じで、広い分野の大量の文章を学ぶため、回答・要約・翻訳・文章作成などをこなせます。アは別の仕組みとした誤りです。ウは新旧が逆です。エは扱うデータの種類による区別で、どちらも言語を扱うモデルです。',
    level: 1,
  },
  {
    id: 'k-prompt-q04',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-1',
    question: 'パラメータとハイパーパラメータの違いとして、適切なものはどれか。',
    choices: [
      'パラメータは人が事前に決める設定値、ハイパーパラメータは学習によって決まる値である',
      'どちらも学習によって自動的に決まる値で、規模だけが異なる',
      'どちらも人が事前に決める値で、設定する場所だけが異なる',
      'パラメータは学習によって決まる値、ハイパーパラメータは人が事前に決める設定値である',
    ],
    answer: 3,
    explanation:
      'エが正しい。「ハイパー」は「パラメータより偉い」という意味ではなく、学習を動かす外側の設定だと考えると区別できます。アは二つが入れ替わっています。イとウは、どちらか一方の性質に両方をそろえた誤りです。この区別は出題されやすい箇所です。',
    level: 2,
  },
  {
    id: 'k-prompt-q05',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-1',
    question: 'Temperature と Top-p の説明として、適切なものはどれか。',
    choices: [
      'Temperature を上げるほど、無難で決まりきった出力になる',
      'Top-p を下げるほど候補の範囲が広がり、多様な出力になる',
      'Temperature は候補の選ばれやすさの差を調整し、Top-p は候補に残す範囲を決める',
      'Temperature と Top-p は同じ設定の別名なので、どちらか一方だけを使えばよい',
    ],
    answer: 2,
    explanation:
      'ウが正しい。ねらいは似ていますが、絞り方が違います。アは向きが逆で、Temperature は上げるほど多様になり、下げるほど無難になります。イも向きが逆で、Top-p は下げるほど候補が絞られて堅実になります。エは同一視した誤りです。値の上下と挙動の向きを正確に覚えてください。',
    level: 3,
  },

  {
    id: 'k-prompt-q06',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-2',
    question: 'プロンプトの 4 要素の組合せとして、適切なものはどれか。',
    choices: [
      'Instruction・Context・Input Data・Output Indicator',
      'Instruction・Condition・Input Data・Output Format',
      'Intent・Context・Information・Output Indicator',
      'Instruction・Context・Example・Output Indicator',
    ],
    answer: 0,
    explanation:
      'アが正しい。指示・文脈・入力データ・出力形式の指定にあたり、本番の選択肢は英語で出るため英語表記のまま覚えてください。イは Condition と Output Format に置き換えた誤りです。ウは Intent と Information に置き換えた誤りです。エは Example を含めた誤りで、例を見せるかどうかは Shot の話です。',
    level: 2,
  },
  {
    id: 'k-prompt-q07',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-2',
    question: '「3 項目の箇条書きで答えてください」という指定は、4 要素のどれにあたるか。',
    choices: [
      'Instruction（指示）',
      'Context（文脈・背景）',
      'Input Data（入力するデータ）',
      'Output Indicator（出力の形）',
    ],
    answer: 3,
    explanation:
      'エが正しい。回答の形式・長さ・項目・文体を決める部分が Output Indicator です。アの Instruction は「文章を要約する」のような、してほしい作業を決める部分で、ここが最も取り違えやすい箇所です。イの Context は読み手や目的、ウの Input Data は処理の対象となる材料であり、いずれも返答の形の指定ではありません。',
    level: 2,
  },
  {
    id: 'k-prompt-q08',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-2',
    question: 'Zero-Shot プロンプティングと Few-Shot プロンプティングの違いとして、適切なものはどれか。',
    choices: [
      'Zero-Shot は無料の範囲で使うやり方、Few-Shot は有料の機能を使うやり方である',
      'Zero-Shot は例を一つも見せずに指示し、Few-Shot は例をいくつか見せてから指示する',
      'Zero-Shot は短いプロンプト、Few-Shot は長いプロンプトを指す呼び方である',
      'Zero-Shot は一度だけ質問し、Few-Shot は同じ質問を何度も繰り返すやり方である',
    ],
    answer: 1,
    explanation:
      'イが正しい。shot は見せる「例」の数を指し、Zero-Shot は例がゼロです。名前から思い出せるようにしてください。アは料金による区別で、誤りです。ウは長さによる区別で、例の有無とは別です。エは質問の回数による区別であり、いずれも Shot が指す内容ではありません。',
    level: 1,
  },
  {
    id: 'k-prompt-q09',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-2',
    question: 'プロンプトの書き方について、適切なものはどれか。',
    choices: [
      'よいプロンプトは、4 要素をそろえることを優先して書く',
      'Few-Shot は Zero-Shot の上位版なので、例を付ける書き方を標準とする',
      '手掛かりを増やすことが第一なので、情報量の多さを優先して書く',
      '4 要素は必要な手掛かりを考える枠組みで、単純な依頼なら一部だけでも通じる',
    ],
    answer: 3,
    explanation:
      'エが正しい。「この文を英訳してください」のように目的と材料が明らかなら、短いプロンプトで足ります。アは誤りで、4 要素は数をそろえること自体が目的ではありません。イも誤りで、Few-Shot は上位版ではなく別の書き方であり、例を作る手間がかかるうえ、偏った例に引きずられることもあります。ウも誤りで、大切なのは量ではなく必要な手掛かりがあることです。',
    level: 2,
  },
  {
    id: 'k-prompt-q10',
    categoryId: 'k-prompt',
    sectionId: 'k-prompt-2',
    question: 'プロンプトの 4 要素のうち、Context（文脈・背景）に当たる部分を 2 つ選びなさい。',
    choices: [
      '「回答は 200 字以内でお願いします」',
      '「相手は初めて問い合わせた顧客です」',
      '「次の問い合わせ文を分類してください」',
      '「社外に公開する資料に使います」',
    ],
    answer: [1, 3],
    explanation:
      'イとエが正しい。Context（文脈・背景）は、目的・読み手・立場・前提条件など、作業を取り巻く状況を伝える部分です。イは相手が誰かを、エは何に使うかを伝えています。アは回答の長さの指定なので Output Indicator（出力形式の指定）です。ウは実行してほしい作業そのものなので Instruction（指示）です。同じ Instruction でも、Context が違えば語調や説明の細かさが変わります。',
    level: 2,
  },
];
