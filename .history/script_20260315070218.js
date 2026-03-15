const questions = document.querySelectorAll(".question");
const options = document.querySelectorAll(".options");

const buttons = document.querySelectorAll(".options button");

const progressBar = document.getElementById("progress-bar");
const timerBar = document.getElementById("timer-bar");
const feedback = document.getElementById("feedback");
const counter = document.getElementById("counter");

let current = 0;
let score = 0;
let timer;
let time = 30;

/* correct answers */

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

/* hide all questions */

function showQuestion(index){

questions.forEach(q=>q.style.display="none");
options.forEach(o=>o.style.display="none");

questions[index].style.display="block";
options[index].style.display="flex";

counter.innerText = `${index+1} / ${questions.length}`;

updateProgress();

startTimer();

}

/* progress bar */

function updateProgress(){

let percent = (current / questions.length) * 100;

progressBar.style.width = percent + "%";

}

/* timer */

function startTimer(){

clearInterval(timer);

time = 30;

timerBar.style.width="100%";

timer = setInterval(()=>{

time--;

timerBar.style.width = (time/30)*100 + "%";

if(time<=0){

clearInterval(timer);

feedback.innerText="⏰ Time up!";

setTimeout(nextQuestion,1200);

}

},1000);

}

/* answer click */

buttons.forEach(btn=>{

btn.addEventListener("click",function(){

clearInterval(timer);

let userAnswer = this.innerText;

let correct = answers[current];

let currentButtons = options[current].querySelectorAll("button");

currentButtons.forEach(b=>b.disabled=true);

if(userAnswer === correct){

this.classList.add("correct");

feedback.innerText="🔥 Wow very nice!";

score++;

}else{

this.classList.add("wrong");

feedback.innerText="❌ Incorrect answer";

currentButtons.forEach(b=>{

if(b.innerText === correct){

b.classList.add("correct");

}

});

}

setTimeout(()=>{

feedback.innerText="";

nextQuestion();

},1500);

});

});

/* next question */

function nextQuestion(){

current++;

if(current < questions.length){

showQuestion(current);

}else{

showResult();

}

}

/* result */

function showResult(){

document.querySelector(".box").innerHTML = `

<h2>Quiz Completed 🎉</h2>

<h3>Your Score: ${score} / ${questions.length}</h3>

<p>Great Job! 🚀</p>

`;

counter.innerText="Finished";

}

/* start */

showQuestion(current);