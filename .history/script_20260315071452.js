const questionEl=document.getElementById("question");
const optionsEl=document.getElementById("options");
const feedback=document.getElementById("feedback");
const counter=document.getElementById("counter");
const progressBar=document.getElementById("progress-bar");
const timerBar=document.getElementById("timer-bar");
const nextBtn=document.getElementById("nextBtn");

let current=0;
let score=0;
let timer;
let time=30;

const comments=[
"🔥 Excellent!",
"👏 Great Job!",
"🚀 You're doing amazing!",
"😎 Smart Answer!",
"💡 Brilliant!"
];

const questions=[

{
q:"What is the capital of France?",
options:["Berlin","Madrid","Paris","Rome"],
answer:"Paris"
},

{
q:"What is the full form of HTML?",
options:["Hyper Text Markup Language","High Text Markup Language","Hyper Text Market Language","None"],
answer:"Hyper Text Markup Language"
},

{
q:"What is Generative AI?",
options:["AI that generates new content","AI that understands language","AI that plays games","AI that recognizes images"],
answer:"AI that generates new content"
},

{
q:"DOM stands for?",
options:["Document Object Model","Data Object Model","Document Oriented Model","Data Oriented Model"],
answer:"Document Object Model"
},

{
q:"Who is the founder of Microsoft?",
options:["Steve Jobs","Bill Gates","Mark Zuckerberg","Elon Musk"],
answer:"Bill Gates"
}

];

function showQuestion(){

let q=questions[current];

questionEl.innerText=q.q;

optionsEl.innerHTML="";

counter.innerText=`${current+1} / ${questions.length}`;

q.options.forEach(option=>{

let btn=document.createElement("button");

btn.innerText=option;

btn.onclick=()=>selectAnswer(btn,option);

optionsEl.appendChild(btn);

});

updateProgress();

startTimer();

}

function updateProgress(){

let percent=(current/questions.length)*100;

progressBar.style.width=percent+"%";

}

function startTimer(){

clearInterval(timer);

time=30;

timerBar.style.width="100%";

timer=setInterval(()=>{

time--;

timerBar.style.width=(time/30)*100+"%";

if(time<=0){

clearInterval(timer);

feedback.innerText="⏰ Time up!";

setTimeout(nextQuestion,1200);

}

},1000);

}

function selectAnswer(btn,option){

clearInterval(timer);

let correct=questions[current].answer;

let buttons=optionsEl.querySelectorAll("button");

buttons.forEach(b=>b.disabled=true);

if(option===correct){

btn.classList.add("correct");

score++;

feedback.innerText=comments[Math.floor(Math.random()*comments.length)];

}else{

btn.classList.add("wrong");

feedback.innerText="❌ Incorrect answer";

buttons.forEach(b=>{
if(b.innerText===correct){
b.classList.add("correct");
}
});

}

nextBtn.style.display="block";

}

nextBtn.onclick=()=>{

current++;

if(current<questions.length){

nextBtn.style.display="none";

feedback.innerText="";

showQuestion();

}else{

showResult();

}

};

function showResult(){

document.querySelector(".box").innerHTML=

`<div class="result">

<h2>Quiz Completed 🎉</h2>

<div class="circle">${score}/${questions.length}</div>

<p>Awesome work! 🚀</p>

<button onclick="location.reload()">Retake Quiz</button>

</div>`;

startConfetti();

}

/* confetti celebration */

function startConfetti(){

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pieces=[];

for(let i=0;i<100;i++){

pieces.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:5+Math.random()*5,
speed:1+Math.random()*3

});

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

pieces.forEach(p=>{

p.y+=p.speed;

if(p.y>canvas.height)p.y=0;

ctx.fillStyle="#0d6f8d";
ctx.fillRect(p.x,p.y,p.size,p.size);

});

requestAnimationFrame(update);

}

update();

}

showQuestion();