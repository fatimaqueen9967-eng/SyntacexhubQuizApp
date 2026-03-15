const questions = [
    { q: "What is the capital of France?",
      options: ["A) Berlin","B) Madrid","C) Paris","D) Rome"], answer: 2 },
    { q: "What is the complete form of HTML?",
      options: ["A) Hyper Text Markup Language","B) High Text Markup Language","C) Hyper Text Market Language","D) Hyper Transfer Markup Language"], answer: 0 },
    { q: "What is Generative AI?",
      options: ["A) AI that generates new content","B) AI that understands natural language","C) AI that can play games","D) AI that can recognize images"], answer: 0 },
    { q: "COMPUTER stands for?",
      options: ["A) Common Operating Machine Purposely Used for Technical & Educational Research","B) Common operation mechanics program electricity","C) Computer Operating Machine Programming Element","D) Computer operation mechanics program electricity"], answer: 0 },
    { q: "What is the role of JavaScript in web development?",
      options: ["A) Adds interactivity to web pages","B) Styles web pages","C) Structures web pages","D) None of the above"], answer: 0 },
    { q: "DOM stands for?",
      options: ["A) Document Object Model","B) Data Object Model","C) Document Oriented Model","D) Data Oriented Model"], answer: 0 },
    { q: "What is CSS?",
      options: ["A) CSS is a language used to style web pages","B) Body of a page","C) Head of a page","D) None of the above"], answer: 0 },
    { q: "What does createElement() do in JavaScript?",
      options: ["A) Creates a new HTML element","B) Removes an existing HTML element","C) Modifies an existing HTML element","D) None of the above"], answer: 0 },
    { q: "What is the use of addEventListener() in JavaScript?",
      options: ["A) Adds an event listener to an HTML element","B) Removes an event listener from an HTML element","C) Modifies an event listener on an HTML element","D) None of the above"], answer: 0 },
    { q: "Who is the founder of Microsoft?",
      options: ["A) Steve Jobs","B) Bill Gates","C) Mark Zuckerberg","D) Elon Musk"], answer: 1 },
    { q: "What is Bootstrap?",
      options: ["A) A CSS framework","B) A JavaScript library","C) A front-end framework","D) A back-end framework"], answer: 0 },
    { q: "What is the full form of CSS?",
      options: ["A) Cascading Style Sheets","B) Computer Style Sheets","C) Creative Style Sheets","D) Colorful Style Sheets"], answer: 0 },
    { q: "Which tag links an external CSS file in HTML?",
      options: ["A) <link rel='stylesheet' href='style.css'>","B) <style src='style.css'>","C) <css href='style.css'>","D) <script href='style.css'>"], answer: 0 },
    { q: "What does API stand for?",
      options: ["A) Application Programming Interface","B) Application Process Integration","C) Automated Program Interaction","D) Application Protocol Interface"], answer: 0 }
];

const TIMER_SEC = 15;
let currentIndex = 0, score = 0, answered = false, timeLeft = TIMER_SEC, timerInterval = null;

const startScreen  = document.getElementById("start-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn     = document.getElementById("startBtn");
const nextBtn      = document.getElementById("nextBtn");
const restartBtn   = document.getElementById("restartBtn");
const questionText = document.getElementById("question-text");
const optionsCont  = document.getElementById("options-container");
const feedbackEl   = document.getElementById("feedback");
const qCounter     = document.getElementById("q-counter");
const timerEl      = document.getElementById("timer");
const progressBar  = document.getElementById("progress-bar");
const resultTrophy = document.getElementById("result-trophy");
const resultTitle  = document.getElementById("result-title");
const resultSub    = document.getElementById("result-sub");
const resultMsg    = document.getElementById("result-msg");
const ringFill     = document.getElementById("ring-fill");
const scoreNum     = document.getElementById("score-num");
const stCorrect    = document.getElementById("st-correct");
const stWrong      = document.getElementById("st-wrong");
const stPct        = document.getElementById("st-pct");

startBtn.addEventListener("click",   startQuiz);
nextBtn.addEventListener("click",    goNext);
restartBtn.addEventListener("click", restartQuiz);

function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

function startQuiz() {
    currentIndex = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "";
    nextBtn.style.display = "none";

    const q = questions[currentIndex];
    qCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    progressBar.style.width = ((currentIndex / questions.length) * 100) + "%";

    questionText.textContent = q.q;
    questionText.classList.remove("slide-in");
    void questionText.offsetWidth;
    questionText.classList.add("slide-in");

    optionsCont.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => selectAnswer(i, btn));
        optionsCont.appendChild(btn);
    });

    nextBtn.textContent = currentIndex === questions.length - 1 ? "See Results →" : "Next →";
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIMER_SEC;
    timerEl.classList.remove("urgent");
    timerEl.textContent = `⏱ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱ ${timeLeft}s`;
        if (timeLeft <= 5)  timerEl.classList.add("urgent");
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answered) {
                answered = true;
                revealCorrect();
                feedbackEl.textContent = "⏰ Time's up!";
                feedbackEl.className   = "timeout";
                nextBtn.style.display  = "block";
            }
        }
    }, 1000);
}

function selectAnswer(selectedIdx, clickedBtn) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const correctIdx = questions[currentIndex].answer;
    const allBtns = optionsCont.querySelectorAll("button");
    allBtns.forEach(b => b.disabled = true);
    allBtns[correctIdx].classList.add("correct");

    if (selectedIdx === correctIdx) {
        score++;
        feedbackEl.textContent = "✅ Correct! Well done.";
        feedbackEl.className   = "ok";
    } else {
        clickedBtn.classList.add("wrong");
        feedbackEl.textContent = `❌ Wrong! Correct: ${questions[currentIndex].options[correctIdx]}`;
        feedbackEl.className   = "err";
    }
    nextBtn.style.display = "block";
}

function revealCorrect() {
    const allBtns = optionsCont.querySelectorAll("button");
    allBtns.forEach(b => b.disabled = true);
    allBtns[questions[currentIndex].answer].classList.add("correct");
}

function goNext() {
    currentIndex++;
    if (currentIndex < questions.length) loadQuestion();
    else showResults();
}

function showResults() {
    clearInterval(timerInterval);
    showScreen(resultScreen);

    const total   = questions.length;
    const wrong   = total - score;
    const percent = Math.round((score / total) * 100);

    scoreNum.textContent  = score;
    stCorrect.textContent = score;
    stWrong.textContent   = wrong;
    stPct.textContent     = percent + "%";

    setTimeout(() => {
        ringFill.style.strokeDashoffset = 314 - (percent / 100) * 314;
    }, 150);

    let trophy, title, sub, msg;
    if (percent === 100) {
        trophy = "🏆"; title = "Perfect Score!";
        sub    = "Absolutely flawless — you got everything right!";
        msg    = "You are a true tech champion. Share your score!";
    } else if (percent >= 80) {
        trophy = "🎉"; title = "Excellent!";
        sub    = "Outstanding performance!";
        msg    = "You really know your tech. Keep it up!";
    } else if (percent >= 60) {
        trophy = "😊"; title = "Good Job!";
        sub    = "You're on the right track.";
        msg    = "A little more practice and you'll ace it!";
    } else if (percent >= 40) {
        trophy = "🙂"; title = "Not Bad!";
        sub    = "You've got the basics!";
        msg    = "Review what you missed and come back stronger!";
    } else {
        trophy = "📚"; title = "Keep Learning!";
        sub    = "Every expert started exactly where you are.";
        msg    = "Don't give up — try again, you've got this!";
    }

    resultTrophy.textContent = trophy;
    resultTitle.textContent  = title;
    resultSub.textContent    = sub;
    resultMsg.textContent    = msg;
}

function restartQuiz() {
    ringFill.style.strokeDashoffset = 314;
    currentIndex = 0;
    score        = 0;
    answered     = false;
    showScreen(startScreen);
}