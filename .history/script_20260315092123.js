/* ============================================================
   QUIZ APP — COMPLETE JAVASCRIPT
   ============================================================ */

// ===== QUESTIONS DATA =====
const questions = [
  {
    q: "What is the capital of France?",
    opts: ["Berlin", "Madrid", "Paris", "Rome"],
    ans: 2
  },
  {
    q: "What is the complete form of HTML?",
    opts: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyper Text Market Language",
      "Hyper Transfer Markup Language"
    ],
    ans: 0
  },
  {
    q: "What is Generative AI?",
    opts: [
      "AI that generates new content",
      "AI that understands natural language only",
      "AI that can play games",
      "AI that recognizes images only"
    ],
    ans: 0
  },
  {
    q: "COMPUTER is an acronym. What does it stand for?",
    opts: [
      "Common Operating Machine Purposely Used for Technical & Educational Research",
      "Common Operation Mechanics Providing Utilities for Technical & Educational Research",
      "Computer Operating Machine Programming Element Technology",
      "Common Operating Mechanism for Programming, Utilities, Testing & Education Research"
    ],
    ans: 0
  },
  {
    q: "What is the role of JavaScript in web development?",
    opts: [
      "Adds interactivity and logic to web pages",
      "Styles the visual appearance of pages",
      "Defines the structure of pages",
      "Manages server-side databases"
    ],
    ans: 0
  },
  {
    q: "DOM stands for?",
    opts: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Data Oriented Model"
    ],
    ans: 0
  },
  {
    q: "What is CSS primarily used for?",
    opts: [
      "Styling and layout of web pages",
      "Adding interactivity to web pages",
      "Structuring content on web pages",
      "Connecting to databases"
    ],
    ans: 0
  },
  {
    q: "What does document.createElement() do in JavaScript?",
    opts: [
      "Creates a new HTML element in memory",
      "Removes an existing HTML element",
      "Modifies an existing HTML element",
      "Selects an existing element"
    ],
    ans: 0
  },
  {
    q: "What is the use of addEventListener() in JavaScript?",
    opts: [
      "Attaches an event handler to an element",
      "Removes an event handler from an element",
      "Triggers an event on an element",
      "Creates a new event type"
    ],
    ans: 0
  },
  {
    q: "Who is the founder of Microsoft?",
    opts: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    ans: 1
  },
  {
    q: "What is Bootstrap?",
    opts: [
      "A CSS framework for responsive front-end design",
      "A JavaScript runtime environment",
      "A back-end web framework",
      "A database management system"
    ],
    ans: 0
  },
  {
    q: "What is the full form of CSS?",
    opts: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    ans: 0
  },
  {
    q: "Which HTML tag is used to link an external CSS file?",
    opts: [
      "<link rel='stylesheet' href='style.css'>",
      "<style src='style.css'>",
      "<css href='style.css'>",
      "<script href='style.css'>"
    ],
    ans: 0
  },
  {
    q: "What does API stand for?",
    opts: [
      "Application Programming Interface",
      "Application Process Integration",
      "Automated Program Interaction",
      "Application Protocol Interface"
    ],
    ans: 0
  }
];

const LABELS = ["A", "B", "C", "D"];
const TIMER_MAX = 15;
const CIRCUMFERENCE = 100.5; // 2 * π * r(16)

// ===== STATE =====
let currentIdx = 0;
let score      = 0;
let answered   = false;
let timerSec   = TIMER_MAX;
let timerInterval = null;

// ===== DOM REFS =====
const startScreen  = document.getElementById("start-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn   = document.getElementById("startBtn");
const nextBtn    = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const qLabel       = document.getElementById("q-label");
const qTotal       = document.getElementById("q-total");
const liveScore    = document.getElementById("live-score");
const timerNum     = document.getElementById("timer-num");
const timerWrap    = document.getElementById("timer-wrap");
const ringFill     = document.getElementById("ring-fill");
const progressFill = document.getElementById("progress-fill");
const questionCard = document.getElementById("question-card");
const qNumberBg    = document.getElementById("q-number-bg");
const qText        = document.getElementById("q-text");
const optionsList  = document.getElementById("options-list");
const feedbackMsg  = document.getElementById("feedback-msg");
const nextLabel    = document.getElementById("next-label");

const resultEmoji  = document.getElementById("result-emoji");
const resultTitle  = document.getElementById("result-title");
const resultSub    = document.getElementById("result-sub");
const donutFill    = document.getElementById("donut-fill");
const donutScore   = document.getElementById("donut-score");
const stCorrect    = document.getElementById("st-correct");
const stWrong      = document.getElementById("st-wrong");
const stPct        = document.getElementById("st-pct");

// ===== INIT =====
qTotal.textContent = questions.length;

startBtn.addEventListener("click",   startQuiz);
nextBtn.addEventListener("click",    onNext);
restartBtn.addEventListener("click", restartQuiz);

// ===== SCREEN TRANSITION =====
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// ===== START QUIZ =====
function startQuiz() {
  currentIdx = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

// ===== RENDER QUESTION =====
function renderQuestion() {
  answered = false;
  feedbackMsg.textContent = "";
  feedbackMsg.className = "feedback-msg";
  nextBtn.style.display = "none";

  const q = questions[currentIdx];

  // Header
  qLabel.textContent = `Q ${currentIdx + 1}`;
  liveScore.textContent = score;
  qNumberBg.textContent = String(currentIdx + 1).padStart(2, "0");

  // Progress bar
  const pct = (currentIdx / questions.length) * 100;
  progressFill.style.width = pct + "%";

  // Animate card in
  questionCard.classList.remove("flip-in", "flip-out");
  void questionCard.offsetWidth;
  questionCard.classList.add("flip-in");

  // Question text
  qText.textContent = q.q;

  // Options
  optionsList.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.innerHTML = `<span class="opt-label">${LABELS[i]}</span>${opt}`;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    optionsList.appendChild(btn);
  });

  // Last question label
  nextLabel.textContent = currentIdx === questions.length - 1 ? "See Results" : "Next";

  startTimer();
}

// ===== TIMER =====
function startTimer() {
  clearInterval(timerInterval);
  timerSec = TIMER_MAX;
  timerWrap.classList.remove("urgent");
  updateTimerUI();

  timerInterval = setInterval(() => {
    timerSec--;
    updateTimerUI();

    if (timerSec <= 5) timerWrap.classList.add("urgent");

    if (timerSec <= 0) {
      clearInterval(timerInterval);
      if (!answered) timeOut();
    }
  }, 1000);
}

function updateTimerUI() {
  timerNum.textContent = timerSec;
  // Animate ring: offset goes from 0 (full) to CIRCUMFERENCE (empty)
  const offset = CIRCUMFERENCE * (1 - timerSec / TIMER_MAX);
  ringFill.style.strokeDashoffset = offset;
}

function timeOut() {
  answered = true;
  revealAnswers(-1);
  feedbackMsg.textContent = "⏰ Time's up!";
  feedbackMsg.className = "feedback-msg timeout";
  nextBtn.style.display = "inline-flex";
}

// ===== SELECT ANSWER =====
function selectAnswer(idx, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const correct = questions[currentIdx].ans;
  revealAnswers(idx);

  if (idx === correct) {
    score++;
    liveScore.textContent = score;
    feedbackMsg.textContent = "✅ Correct!";
    feedbackMsg.className = "feedback-msg ok";
  } else {
    feedbackMsg.textContent = `❌ Wrong! Correct: ${LABELS[correct]}`;
    feedbackMsg.className = "feedback-msg err";
  }

  nextBtn.style.display = "inline-flex";
}

// ===== REVEAL CORRECT / WRONG =====
function revealAnswers(selected) {
  const correct = questions[currentIdx].ans;
  const btns    = optionsList.querySelectorAll(".opt-btn");

  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) {
      btn.classList.add("correct");
    } else if (i === selected) {
      btn.classList.add("wrong");
    }
  });
}

// ===== NEXT / RESULTS =====
function onNext() {
  currentIdx++;
  if (currentIdx < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// ===== SHOW RESULTS =====
function showResults() {
  clearInterval(timerInterval);
  showScreen(resultScreen);

  const total   = questions.length;
  const wrong   = total - score;
  const percent = Math.round((score / total) * 100);

  donutScore.textContent = score;
  stCorrect.textContent  = score;
  stWrong.textContent    = wrong;
  stPct.textContent      = percent + "%";

  // Animate donut (circumference of r=50 circle = 314)
  const donutCirc   = 314;
  const donutOffset = donutCirc - (percent / 100) * donutCirc;
  setTimeout(() => {
    donutFill.style.strokeDashoffset = donutOffset;
  }, 100);

  // Dynamic message
  if (percent === 100) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Perfect Score!";
    resultSub.textContent   = "Outstanding! You nailed every single question!";
  } else if (percent >= 80) {
    resultEmoji.textContent = "🎉";
    resultTitle.textContent = "Excellent!";
    resultSub.textContent   = "Great work! You really know your tech!";
  } else if (percent >= 60) {
    resultEmoji.textContent = "😊";
    resultTitle.textContent = "Good Job!";
    resultSub.textContent   = "Solid performance! Keep practicing to ace it.";
  } else if (percent >= 40) {
    resultEmoji.textContent = "🙂";
    resultTitle.textContent = "Not Bad!";
    resultSub.textContent   = "A bit more study and you'll get there!";
  } else {
    resultEmoji.textContent = "📚";
    resultTitle.textContent = "Keep Learning!";
    resultSub.textContent   = "Every expert started as a beginner. Don't give up!";
  }
}

// ===== RESTART =====
function restartQuiz() {
  // Reset donut
  donutFill.style.strokeDashoffset = 314;
  startQuiz();
}