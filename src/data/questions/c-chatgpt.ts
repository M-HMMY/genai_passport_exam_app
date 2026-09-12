import type { Question } from '../../types';

/**
 * 第 2 章 生成AI：ChatGPT と主要な生成 AI（categoryId: 'c-chatgpt'）の確認問題。
 * sectionId は必ず付ける（解説から教本へ戻る導線に使う）。
 */
export const cChatgptQuestions: Question[] = [
  {
    id: 'c-chatgpt-q01',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'ChatGPT と GPT の関係として、適切なものはどれか。',
    choices: [
      'ChatGPT は対話サービスの名前、GPT はその中で文章を処理・生成するモデルの名前',
      'ChatGPT はモデルの名前、GPT はそれを提供する会社の名前',
      'ChatGPT と GPT は同じものを指し、単に呼び方が違うだけである',
      'ChatGPT は日本語向けの名称、GPT は英語向けの名称である',
    ],
    answer: 0,
    explanation:
      'アが正しい。ChatGPT は会話できる受付窓口、GPT は奥で言葉を組み立てるエンジンにあたります。イは誤りで、GPT を開発した組織は OpenAI です。ウは両者を同一視した誤りで、選択肢で入れ替えて出されやすい箇所です。エは言語による使い分けという記述で、事実と異なります。',
    level: 1,
  },
  {
    id: 'c-chatgpt-q02',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'GPT という略称が表す 3 つの語の組合せとして、適切なものはどれか。',
    choices: [
      'General Purpose Transformer',
      'Generative Pre-trained Translator',
      'Generative Pre-trained Transformer',
      'Generative Predictive Transformer',
    ],
    answer: 2,
    explanation:
      'ウが正しい。Generative は生成する、Pre-trained は事前学習済み、Transformer はモデルの構造名で、3 語それぞれに意味があります。アは Generative を General Purpose に置き換えた誤りです。イは Transformer を Translator に置き換えたもので、翻訳専用ではありません。エは Pre-trained を Predictive に置き換えた誤りです。',
    level: 1,
  },
  {
    id: 'c-chatgpt-q03',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'GPT の「Pre-trained」が表す内容として、適切なものはどれか。',
    choices: [
      '利用者が質問するたびに、その場で学習をやり直していること',
      '質問を受ける前に、大量の文章から言葉の並び方を学んでいること',
      '出力する前に、内容が正しいかを事前に検証していること',
      '提供前に、専門家が回答を一つずつ確認して登録していること',
    ],
    answer: 1,
    explanation:
      'イが正しい。事前学習によって言葉の並び方を身につけ、それを使って次に来そうな語を選びます。アは誤りで、利用のたびにモデルが学習し直すわけではありません。ウは事実確認の話で、Pre-trained が指すのは事前に学ぶことであり、出力のたびに内容の正しさを確かめることではありません。エは回答の登録の話であり、事前学習とは異なります。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q04',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'NLP の正式名称と、その位置づけの説明として、適切なものはどれか。',
    choices: [
      'Neural Language Processing であり、ニューラルネットワークの一種である',
      'Natural Language Prediction であり、次の語を予測するモデルの名前である',
      'Neural Learning Process であり、学習の手順を表す言葉である',
      'Natural Language Processing であり、人間の言葉を扱う分野の名前である',
    ],
    answer: 3,
    explanation:
      'エが正しい。Natural は自然な、Language は言語、Processing は処理を表し、NLP は分野の名前であってモデルの名前ではありません。ア・ウは Natural を Neural と取り違えています。イは Processing を Prediction に置き換えたうえ、モデル名としている点も誤りです。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q05',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'ChatGPT が一般公開された時期として、適切なものはどれか。',
    choices: ['2022 年 11 月', '2018 年 6 月', '2020 年 5 月', '2024 年 5 月'],
    answer: 0,
    explanation:
      'アが正しい。2022 年 11 月に一般公開され、公開後わずか 2 か月ほどで利用者が急増して生成 AI ブームの起点になりました。初期の ChatGPT は GPT-3.5 系列を対話向けに調整したものです。イは GPT-1 が発表された時期に近く、ウは GPT-3 の時期、エは GPT-4o の時期にあたり、いずれも ChatGPT の公開時期ではありません。',
    level: 1,
  },
  {
    id: 'c-chatgpt-q06',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-1',
    question: 'ハルシネーションが起こる理由として、適切なものはどれか。',
    choices: [
      'AI が利用者をだまそうとして、意図的に誤った内容を選ぶため',
      '次に来そうな言葉を選び続ける仕組みで文章を作っており、事実を調べる仕組みではないため',
      '学習に使ったデータがすべて誤っており、正しい情報を持っていないため',
      'AI が一度に出力できる文章の長さに、上限が定められているため',
    ],
    answer: 1,
    explanation:
      'イが正しい。情報が足りなくても、言葉として自然な続きを組み立てることがあります。実在しない本や判例にもそれらしい説明を作ることがあるため、重要な事実は人が一次資料で確かめます。アは「わざとの嘘」という誤解です。ウは学習データがすべて誤りという極端な記述で、事実と異なります。エは出力できる長さの上限の話であり、事実と違う内容が作られる理由にはなりません。',
    level: 2,
  },

  {
    id: 'c-chatgpt-q07',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'GPT-3 のパラメータ数として、適切なものはどれか。',
    choices: ['1 億 7,500 万', '17 億 5,000 万', '1,750 億', '17 兆 5,000 億'],
    answer: 2,
    explanation:
      'ウが正しい。GPT-3 は 1,750 億パラメータまで大規模化し、指示や少数例だけで多様な仕事に対応しやすくなりました。ただしパラメータ数はモデルの大きさの目安のひとつであり、多いほど必ず賢いという意味ではありません。ア・イ・エはいずれも桁が異なり、正しい値ではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q08',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'GPT-1 が示した進め方として、適切なものはどれか。',
    choices: [
      '人間の評価を用いて、答え方を望ましい方向へ調整する進め方',
      '文章に加えて画像も入力として受け取り、両方をまとめて扱う進め方',
      '答える前に時間をかけて考え、方針を直しながら難問を解く進め方',
      '大量の文章で事前学習し、そのうえで仕事別に追加調整する二段構えの進め方',
    ],
    answer: 3,
    explanation:
      'エが正しい。仕事ごとに大量の正解付きデータを用意する負担が大きいという課題に対し、先に広く学んでから用途別に調整する道を示しました。アは InstructGPT 以降の RLHF の話です。イは GPT-4 のマルチモーダルの話です。ウは o 系のねらいであり、いずれも GPT-1 の内容ではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q09',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'InstructGPT が改善した点として、適切なものはどれか。',
    choices: [
      'RLHF を用いて、人間の指示や好みに沿う答え方へ近づけた',
      'パラメータを大幅に増やし、扱える知識の量を広げた',
      '画像を入力として受け取れるようにし、マルチモーダルにした',
      '応答までの時間を短縮し、音声での対話を可能にした',
    ],
    answer: 0,
    explanation:
      'アが正しい。GPT-3 は自然な続きを作れても、利用者の指示どおり安全で役立つ形で答えるとは限りませんでした。そこで人が回答例を示し、複数回答を順位付けする RLHF が導入されました。イは GPT-3 までの大規模化の流れです。ウは GPT-4 の内容、エは GPT-4o の内容であり、いずれも InstructGPT の改善点ではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q10',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'RLHF の正式名称として、適切なものはどれか。',
    choices: [
      'Reinforcement Learning for Hybrid Fine-tuning',
      'Reinforcement Learning from Human Feedback',
      'Recurrent Learning from Human Feedback',
      'Reinforcement Logic with Human Filtering',
    ],
    answer: 1,
    explanation:
      'イが正しい。訳は「人間のフィードバックによる強化学習」で、人間の評価を手掛かりに望ましい答え方を学ばせる方法です。アは Human Feedback を別の語に置き換えた誤りです。ウは Reinforcement を Recurrent と取り違えており、Recurrent が入るのは RNN です。エも実在しない名称です。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q11',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'アライメント・RLHF・ファインチューニングの関係として、適切なものはどれか。',
    choices: [
      'アライメントは手段、RLHF は目標、ファインチューニングはその成果物である',
      '3 つはいずれも同じ処理を指し、呼び方が違うだけである',
      'アライメントは目標、RLHF はその手段のひとつ、ファインチューニングは追加調整の広い方法である',
      'ファインチューニングは目標、アライメントは手段、RLHF は評価の指標である',
    ],
    answer: 2,
    explanation:
      'ウが正しい。AI の振る舞いを人間の意図や価値観にそろえることがアライメントという目標で、RLHF はそれを実現する手段のひとつ、ファインチューニングは事前学習済みモデルを用途向けに追加調整する広い方法です。アは目標と手段が逆です。イは 3 つを同一視した誤りです。エも役割の対応が誤っています。',
    level: 3,
  },
  {
    id: 'c-chatgpt-q12',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'GPT-4 について発表時に示された内容として、適切なものはどれか。',
    choices: [
      '音声で自然に会話できるようになり、応答の速さが大きく改善された',
      '答える前に長い時間をかけて考える、推論重視の系統として発表された',
      '手元の資料を検索してから答える仕組みを、モデル内部に組み込んだ',
      '文章に加えて画像も入力として受け取れる、マルチモーダルなモデルとされた',
    ],
    answer: 3,
    explanation:
      'エが正しい。GPT-4 は写真・図・画面などを入力として理解し、文章で答えられるモデルとして発表されました。「画像を扱う」と「画像を作る」は別である点にも注意してください。アは GPT-4o の特徴です。イは o 系の特徴です。ウは RAG の説明であり、いずれも GPT-4 の発表内容ではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q13',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-2',
    question: 'モデルのパラメータ数と性能の関係について、適切なものはどれか。',
    choices: [
      'パラメータが多いほど複雑な規則性を持てる余地は増えるが、それだけで賢さは決まらない',
      'パラメータが多いモデルは、どの用途でも高い精度を示すと考えてよい',
      'パラメータの数は、モデルの応答速度を決めるための値である',
      'パラメータの数は、学習に使ったデータの件数と同じ値になる',
    ],
    answer: 0,
    explanation:
      'アが正しい。データセットの量と質、学習方法、利用時の道具も性能を左右します。イは誤りで、性能はデータの量と質、学習方法、何をさせるかによっても変わります。ウは応答速度を決める値とした誤りです。エはパラメータ数とデータ件数を混同した記述であり、両者は別のものです。',
    level: 2,
  },

  {
    id: 'c-chatgpt-q14',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'GPT-4o の「o」が表すものとして、適切なものはどれか。',
    choices: [
      'online（つながっている）の頭文字',
      'omni（すべて）の頭文字',
      'optimized（最適化された）の頭文字',
      '数字の 0 を表し、世代の区切りを示す記号',
    ],
    answer: 1,
    explanation:
      'イが正しい。文章・画像・音声をまとめて扱い、自然で速い対話を狙ったことを表します。エは数字の 0 との取り違えで、名前から生じやすい誤解です。ア・ウはいずれも別の語を当てはめた誤りです。なお o1・o3・o4-mini の o は omni ではなく、推論に時間を使う系統を指すため、意味を混ぜないでください。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q15',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'GPT-o1・GPT-o3・GPT-o4 に共通するねらいとして、適切なものはどれか。',
    choices: [
      '音声や画像を含めて、一つのモデルでまとめて扱えるようにすること',
      '応答をできるだけ短く速く返し、対話のテンポを上げること',
      'すぐ答えるより、答える前の推論に時間をかけてから答えること',
      '外部の資料を検索し、その内容に基づいて答えること',
    ],
    answer: 2,
    explanation:
      'ウが正しい。多段階の難問で考え違いが起きやすいという課題に対し、方針を直しながら解く力を重視した系統です。アは GPT-4o のねらいです。イは即答型の特徴で、o 系とは方向が逆です。エは RAG の説明であり、いずれも o 系に共通するねらいではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q16',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'Code Interpreter と GPTs の説明として、適切なものはどれか。',
    choices: [
      'どちらもプログラムを書くための機能で、対象とする言語が異なる',
      'Code Interpreter は自分用の ChatGPT を作る仕組み、GPTs はデータを解析する機能',
      'どちらも画像を生成する機能で、出力の解像度が異なる',
      'Code Interpreter はデータをプログラムで解析・処理する機能、GPTs は用途別の ChatGPT を作る仕組み',
    ],
    answer: 3,
    explanation:
      'エが正しい。前者は表計算ファイルなどをコードで集計・変換・可視化する機能、後者は指示・資料・機能を組み合わせて用途別の ChatGPT を組み立てる仕組みです。イは二つの説明が入れ替わっています。アはどちらもプログラム作成としている点が誤りです。ウは画像生成としている点が誤りです。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q17',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'Sora・Codex・Image Generation が作るものの組合せとして、適切なものはどれか。',
    choices: [
      'Sora は動画、Codex はプログラム、Image Generation は画像',
      'Sora は画像、Codex は動画、Image Generation はプログラム',
      'Sora はプログラム、Codex は画像、Image Generation は動画',
      'Sora は音声、Codex は動画、Image Generation は画像',
    ],
    answer: 0,
    explanation:
      'アが正しい。名前と生成物を一対一で対応させて覚えてください。Codex は名前のとおりコードにかかわり、Image Generation は画像を生成・編集します。イ・ウ・エはいずれも対応が入れ替わっています。なお Operator は生成物の名前ではなく、画面を操作して作業を代行する道具です。',
    level: 1,
  },
  {
    id: 'c-chatgpt-q18',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'Operator の説明として、適切なものはどれか。',
    choices: [
      '指示文から動画を生成する道具である',
      '画面を見てクリックや入力を行い、ブラウザなどの操作を代行する道具である',
      '利用者からの問い合わせを、担当者へ振り分ける道具である',
      'アップロードした表計算ファイルを集計し、グラフにする機能である',
    ],
    answer: 1,
    explanation:
      'イが正しい。Operator は生成物の名前ではなく、操作の代行にあたります。実際の処理を進めるため、送信内容や確定直前の画面は人が確認します。アは Sora の説明です。ウは問い合わせ管理の話で、この道具の役割ではありません。エは Code Interpreter の説明です。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q19',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-3',
    question: 'GPT-5 が、それ以前の系列に対してまとめた点として、適切なものはどれか。',
    choices: [
      '画像の入力に対応し、写真について文章で答えられるようにした',
      '人間の評価を用いる調整を初めて導入し、指示に沿う答え方にした',
      '通常の応答と深い推論を、一つのシステム内で使い分けるようにした',
      '事前学習と用途別の追加調整という、二段構えの進め方を初めて示した',
    ],
    answer: 2,
    explanation:
      'ウが正しい。それまで、即答する GPT 系と考える o 系を利用者が使い分ける必要がありました。アは GPT-4 の内容です。イは InstructGPT の内容です。エは GPT-1 の内容であり、いずれも GPT-5 がまとめた点ではありません。なお GPT-5 はシラバスが扱う到達点であって、常に最新という意味ではありません。',
    level: 2,
  },

  {
    id: 'c-chatgpt-q20',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-4',
    question: '生成 AI と提供元の組合せとして、適切なものはどれか。',
    choices: [
      'Gemini は Anthropic、Claude は Google、Copilot は Microsoft',
      'Gemini は Microsoft、Claude は Google、Copilot は Anthropic',
      'Gemini は Google、Claude は Microsoft、Copilot は Anthropic',
      'Gemini は Google、Claude は Anthropic、Copilot は Microsoft',
    ],
    answer: 3,
    explanation:
      'エが正しい。名前と会社を一対一で即答できるようにしてください。アは Gemini と Claude の提供元が入れ替わっています。イは 3 つとも対応が誤っています。ウは Claude と Copilot の提供元が入れ替わっています。提供元の取り違えは出題されやすい箇所です。',
    level: 1,
  },
  {
    id: 'c-chatgpt-q21',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-4',
    question: 'Copilot という名前と、その位置づけの説明として、適切なものはどれか。',
    choices: [
      'copilot は副操縦士の意味で、最終決定をせず仕事を隣で支援するという位置づけを表す',
      'copilot は自動操縦の意味で、人の判断を介さずに業務を完了させることを表す',
      'copilot は複写の意味で、既存の文書をそのまま複製する機能を表す',
      'copilot は共同経営者の意味で、経営判断を代行することを表す',
    ],
    answer: 0,
    explanation:
      'アが正しい。Word・Excel・PowerPoint・Outlook・Teams などの作業場所へ組み込まれ、人の仕事を支援します。イは自動操縦と取り違えた記述で、名前の意味と位置づけの両方が誤りです。ウは copy と混同した誤りです。エも語の意味の取り違えであり、経営判断を代行するものではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q22',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-4',
    question: 'Gemini の特徴として、適切なものはどれか。',
    choices: [
      'Microsoft 365 の各アプリに組み込まれ、文書作成や表計算、メール作成を支援する',
      '文章・画像・音声・動画・コードなど複数種類の情報を扱い、Google のサービスと組み合わされる',
      '扱えるのは文章だけで、対話の履歴も保存されず、一問一答の用途に限定されている',
      'プログラムの作成だけを目的とし、文章の作成には対応していない',
    ],
    answer: 1,
    explanation:
      'イが正しい。2023 年に最初の世代が発表され、当初からマルチモーダルを前面に出しました。検索や Gmail、Google ドライブなどとの組み合わせも特徴です。アは Copilot の説明です。ウは扱える情報の種類と用途を限定した誤りです。エも誤りで、文章の作成にも対応しています。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q23',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-4',
    question: 'Claude の特徴として、適切なものはどれか。',
    choices: [
      '検索エンジンが返した結果を並べ替えることを専門に行う',
      '画像の生成に特化したモデルで、文章の作成は扱わない',
      '文章や画像、長い文書を読み、要約・分析・文章作成などを行う',
      '表計算ソフトに組み込まれて動作し、単独では利用できない',
    ],
    answer: 2,
    explanation:
      'ウが正しい。ファイルを読み込んで整理したり、Artifacts として文書やコード、図表などを会話とは別に作ったりできます。アは検索の話で、Claude の説明ではありません。イは画像生成に限定した誤りで、文章も扱います。エは Copilot のような組み込み型の説明であり、Claude の特徴ではありません。',
    level: 2,
  },
  {
    id: 'c-chatgpt-q24',
    categoryId: 'c-chatgpt',
    sectionId: 'c-chatgpt-4',
    question: '主要な生成 AI を比べるときの見方として、適切なものはどれか。',
    choices: [
      '公開時期の新しさを基準にすれば、用途に合うものを選べる',
      'それぞれ専用の分野が決まっており、他の用途に使うことは想定されていない',
      'パラメータ数の多さを基準にすれば、業務に合うものを選べる',
      '同じ名前でも版や組み込まれた製品で機能が違うため、提供元と使われ方で捉える',
    ],
    answer: 3,
    explanation:
      'エが正しい。Copilot のように、同じ名前でも組み込まれた製品によってできることが変わります。版が上がれば機能も変わるため、名前だけで優劣を決められません。アは公開時期だけを基準にした誤りで、新しい版が既存の用途で必ず上回るとは限りません。イは専用分野に固定した誤りです。ウはパラメータ数だけを基準にした誤りで、規模と業務への適合は別のことです。',
    level: 2,
  },
];
