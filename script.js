// クイズデータ（5問）
const quizData = [
  {
    question: "日本で一番標高が高い山はどれでしょう？",
    choices: ["北岳", "富士山", "奥穂高岳", "槍ヶ岳"],
    answer: 1 // インデックス (0始まり: 富士山)
  },
  {
    question: "太陽系の中で一番大きな惑星はどれでしょう？",
    choices: ["地球", "土星", "木星", "海王星"],
    answer: 2 // 木星
  },
  {
    question: "ことわざ「犬も歩けば◯◯に当たる」。◯◯に入るのは？",
    choices: ["棒", "石", "壁", "木"],
    answer: 0 // 棒
  },
  {
    question: "オリンピックの五輪のシンボルマークは何を表しているでしょう？",
    choices: ["5つの季節", "5つの大陸", "5つの競技種目", "5つの平和条約"],
    answer: 1 // 5つの大陸
  },
  {
    question: "世界で一番面積が広い国はどこでしょう？",
    choices: ["アメリカ", "中国", "カナダ", "ロシア"],
    answer: 3 // ロシア
  }
];

// 状態管理
let currentQuestionIndex = 0;
let score = 0;

// DOM要素の取得
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionNumberEl = document.getElementById("question-number");
const progressTextEl = document.getElementById("progress-text");
const questionTextEl = document.getElementById("question-text");
const choicesContainerEl = document.getElementById("choices-container");

const feedbackContainerEl = document.getElementById("feedback-container");
const feedbackTextEl = document.getElementById("feedback-text");
const nextButtonEl = document.getElementById("next-button");

const correctCountEl = document.getElementById("correct-count");
const totalCountEl = document.getElementById("total-count");
const resultMessageEl = document.getElementById("result-message");
const restartButtonEl = document.getElementById("restart-button");

// クイズの初期化・開始
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  showQuestion();
}

// 問題の表示
function showQuestion() {
  const currentQuiz = quizData[currentQuestionIndex];

  // 画面のテキスト更新
  questionNumberEl.textContent = `第 ${currentQuestionIndex + 1} 問`;
  progressTextEl.textContent = `${currentQuestionIndex + 1} / ${quizData.length}`;
  questionTextEl.textContent = currentQuiz.question;

  // フィードバック領域を隠す
  feedbackContainerEl.classList.remove("show");
  feedbackTextEl.textContent = "";

  // 選択肢のクリア＆生成
  choicesContainerEl.innerHTML = "";
  currentQuiz.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = `${index + 1}. ${choice}`;
    button.addEventListener("click", () => handleChoiceClick(index));
    choicesContainerEl.appendChild(button);
  });
}

// 選択肢がクリックされた時の処理
function handleChoiceClick(selectedIndex) {
  const currentQuiz = quizData[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuiz.answer;

  if (isCorrect) {
    score++;
  }

  // 全ての選択肢ボタンを無効化し、正解・不正解をハイライト
  const choiceButtons = choicesContainerEl.querySelectorAll(".choice-btn");
  choiceButtons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuiz.answer) {
      btn.classList.add("correct");
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  // フィードバックの表示
  if (isCorrect) {
    feedbackTextEl.className = "correct-msg";
    feedbackTextEl.textContent = "⭕ 正解！";
  } else {
    feedbackTextEl.className = "wrong-msg";
    feedbackTextEl.textContent = `❌ 不正解... 正解は「${currentQuiz.choices[currentQuiz.answer]}」でした`;
  }

  // 最後の問題ならボタンテキストを「結果を見る」に変更
  if (currentQuestionIndex === quizData.length - 1) {
    nextButtonEl.textContent = "結果を見る";
  } else {
    nextButtonEl.textContent = "次の問題へ";
  }

  feedbackContainerEl.classList.add("show");
}

// 次の問題へ進む処理
function handleNextClick() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 結果画面の表示
function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  correctCountEl.textContent = score;
  totalCountEl.textContent = quizData.length;

  // スコアに応じたメッセージ
  if (score === quizData.length) {
    resultMessageEl.textContent = "全問正解！素晴らしい！パーフェクトです🎉";
  } else if (score >= 3) {
    resultMessageEl.textContent = "お見事！高得点です👏";
  } else {
    resultMessageEl.textContent = "次は満点を目指してリトライしてみよう💪";
  }
}

// イベントリスナーの登録
nextButtonEl.addEventListener("click", handleNextClick);
restartButtonEl.addEventListener("click", startQuiz);

// 初回開始
startQuiz();
