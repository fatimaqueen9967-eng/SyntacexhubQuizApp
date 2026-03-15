const questions = [
    { q: "What is the capital of France?", options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"], answer: 2 },
    { q: "What is the complete form of HTML?", options: ["A) Hyper Text Markup Language", "B) High Text Markup Language", "C) Hyper Text Market Language", "D) Hyper Transfer Markup Language"], answer: 0 },
    { q: "What is Generative AI?", options: ["A) AI that generates new content", "B) AI that understands natural language", "C) AI that can play games", "D) AI that can recognize images"], answer: 0 },
    { q: "COMPUTER stands for?", options: ["A) Common Operating Machine Purposely Used for Technical & Educational Research", "B) Common operation mechanics program electricity", "C) Computer Operating Machine Programming Element", "D) Computer operation mechanics program electricity"], answer: 0 },
    { q: "What is the role of JavaScript in web development?", options: ["A) Adds interactivity to web pages", "B) Styles web pages", "C) Structures web pages", "D) None of the above"], answer: 0 },
    { q: "DOM stands for?", options: ["A) Document Object Model", "B) Data Object Model", "C) Document Oriented Model", "D) Data Oriented Model"], answer: 0 },
    { q: "What is CSS?", options: ["A) CSS is a language used to style web pages", "B) Body of a page", "C) Head of a page", "D) None of the above"], answer: 0 },
    { q: "What does createElement() do in JavaScript?", options: ["A) Creates a new HTML element", "B) Removes an existing HTML element", "C) Modifies an existing HTML element", "D) None of the above"], answer: 0 },
    { q: "What is the use of addEventListener() in JavaScript?", options: ["A) Adds an event listener to an HTML element", "B) Removes an event listener from an HTML element", "C) Modifies an event listener on an HTML element", "D) None of the above"], answer: 0 },
    { q: "Who is the founder of Microsoft?", options: ["A) Steve Jobs", "B) Bill Gates", "C) Mark Zuckerberg", "D) Elon Musk"], answer: 1 },
    { q: "What is Bootstrap?", options: ["A) A CSS framework", "B) A JavaScript library", "C) A front-end framework", "D) A back-end framework"], answer: 0 },
    { q: "What is the full form of CSS?", options: ["A) Cascading Style Sheets", "B) Computer Style Sheets", "C) Creative Style Sheets", "D) Colorful Style Sheets"], answer: 0 },
    { q: "Which tag links an external CSS file in HTML?", options: ["A) <link rel='stylesheet' href='style.css'>", "B) <style src='style.css'>", "C) <css href='style.css'>", "D) <script href='style.css'>"], answer: 0 },
    { q: "What does API stand for?", options: ["A) Application Programming Interface", "B) Application Process Integration", "C) Automated Program Interaction", "D) Application Protocol Interface"], answer: 0 }
];

const TIMER_SECONDS = 15;
let currentIndex = 0, score = 0, answered = false, timeLeft = TIMER_SECONDS, timerInterval = null;

const quizBox          = document.getElementById("quiz-box");
const resultBox        = document.getElementById("result-box");
const questionText     = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback         = document.getElementById("feedback");
const nextBtn          = document.getElementById("nextBtn");
const restartBtn       = document.getElementById("restartBtn");
const qCounter         = document.getElementById("q-counter");
const timerEl          = document.getElementById("timer");
const progressBar      = document.getElementById("progress-bar");
const resultEmoji      = document.getElementById("result-emoji");
const resultTitle      = document.getElementById("result-title");
const resultScore      = document.getElementById("result-score");
const resultMsg        = document.getElementById("result-msg");
const statCorrect      = document.getElementById("stat-correct");
const statWrong        = document.getElementById("stat-wrong");

nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();

function loadQuestion() {
    answered = false;
    feedback.textContent = "";
    feedback.className = "";
    nextBtn.style.display = "none";

    const q = questions[currentIndex];
    qCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    progressBar.style.width = ((currentIndex / questions.length) * 100) + "%";

    questionText.textContent = q.q;
    questionText.classList.remove("slide-in");
    void questionText.offsetWidth;
    questionText.classList.add("slide-in");

    optionsContainer.innerHTML = "";
    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(i, btn));
        optionsContainer.appendChild(btn);
    });

    nextBtn.textContent = currentIndex === questions.length - 1 ? "See Results →" : "Next →";
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIMER_SECONDS;
    timerEl.classList.remove("urgent");
    timerEl.textContent = `⏱ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱ ${timeLeft}s`;
        if (timeLeft <= 5) timerEl.classList.add("urgent");
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answered) {
                answered = true;
                highlightCorrect();
                feedback.textContent = "⏰ Time's up!";
                feedback.className = "timeout";
                nextBtn.style.display = "block";
            }
        }
    }, 1000);
}

function selectAnswer(selectedIndex, clickedBtn) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const correctIndex = questions[currentIndex].answer;
    const allBtns = optionsContainer.querySelectorAll("button");
    allBtns.forEach(btn => btn.disabled = true);
    allBtns[correctIndex].classList.add("correct");

    if (selectedIndex === correctIndex) {
        score++;
        feedback.textContent = "✅ Correct! Well done.";
        feedback.className = "ok";
    } else {
        clickedBtn.classList.add("wrong");
        feedback.textContent = `❌ Wrong! Correct: ${questions[currentIndex].options[correctIndex]}`;
        feedback.className = "err";
    }
    nextBtn.style.display = "block";
}

function highlightCorrect() {
    const allBtns = optionsContainer.querySelectorAll("button");
    allBtns.forEach(btn => btn.disabled = true);
    allBtns[questions[currentIndex].answer].classList.add("correct");
}

function goNext() {
    currentIndex++;
    if (currentIndex < questions.length) loadQuestion();
    else showResults();
}

function showResults() {
    clearInterval(timerInterval);
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    const total = questions.length;
    const wrong = total - score;
    const percent = Math.round((score / total) * 100);

    resultScore.textContent = `${score} / ${total}`;
    statCorrect.textContent = `✅ Correct: ${score}`;
    statWrong.textContent   = `❌ Wrong: ${wrong}`;

    if (percent === 100)     { resultEmoji.textContent = "🏆"; resultTitle.textContent = "Perfect Score!";  resultMsg.textContent = "Outstanding! You got every question right!"; }
    else if (percent >= 80)  { resultEmoji.textContent = "🎉"; resultTitle.textContent = "Excellent!";      resultMsg.textContent = "Great job! You really know your stuff."; }
    else if (percent >= 60)  { resultEmoji.textContent = "😊"; resultTitle.textContent = "Good Job!";       resultMsg.textContent = "Solid! A bit more practice and you'll ace it."; }
    else if (percent >= 40)  { resultEmoji.textContent = "🙂"; resultTitle.textContent = "Not Bad!";        resultMsg.textContent = "Keep studying and you'll improve quickly!"; }
    else                     { resultEmoji.textContent = "📚"; resultTitle.textContent = "Keep Learning!";  resultMsg.textContent = "Every expert started as a beginner!"; }
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    quizBox.style.display = "block";
    resultBox.style.display = "none";
    loadQuestion();
}