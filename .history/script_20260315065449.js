const questions = document.querySelectorAll(".question");
const options = document.querySelectorAll(".options");
const buttons = document.querySelectorAll(".options button");

const progress = document.getElementById("progress");
const timerBar = document.getElementById("timer");
const message = document.getElementById("message");

let current = 0;
let score = 0;
let time = 30;
let timer;

/* Correct answers */

const answers = [
"C) Paris",
"C) Paris",
"C) Paris",
"A) Hyper Text Markup Language",
"A) AI that generates new content",
"A) Common Operating Machine Programming Element",
"A) Adds interactivity to web pages",
"A) Document Object Model",
"A) CSS is a language used in web development in order to style web pages",
"A) Creates a new HTML element",
"A) Adds an event listener to an HTML element",
"B) Bill Gates",
"C) A front-end framework",
"A) Cascading Style Sheets"
];

/* Hide all questions */

function showQuestion(index){

questions.forEach(q => q.style.display="none");
options.forEach(o => o.style.display="none");

questions[index].style.display="block";
options[index].style.display="flex";

updateProgress();
startTimer();

}

/* Progress bar */

function updateProgress(){

let percent = ((current)/questions.length)*100;
progress.style.width = percent + "%";

}

/* Timer */

function startTimer(){

clearInterval(timer);

time = 30;

timerBar.style.width="100%";

timer = setInterval(()=>{

time--;

timerBar.style.width = (time/30)*100 + "%";

if(time<=0){

clearInterval(timer);
nextQuestion();

}

},1000);

}

/* Check answer */

buttons.forEach(btn=>{

btn.addEventListener("click",function(){

clearInterval(timer);

let userAnswer = this.innerText;

if(userAnswer === answers[current]){

this.classList.add("correct");
score++;

message.innerText = "🔥 Wow Very Nice!";

}else{

this.classList.add("wrong");
message.innerText = "🙂 Good Try!";

}

setTimeout(()=>{

message.innerText="";
nextQuestion();

},1500);

});

});

/* Next Question */

function nextQuestion(){

current++;

if(current < questions.length){

showQuestion(current);

}else{

showResult();

}

}

/* Final Score */

function showResult(){

document.querySelector(".box").innerHTML = `

<h2>🎉 Quiz Completed!</h2>

<h3>Your Score: ${score} / ${questions.length}</h3>

<p>Great job! Keep learning 🚀</p>

`;

}

/* Start quiz */

showQuestion(current);