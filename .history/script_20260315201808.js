const quizData=[

{
question:"What is the capital of France?",
options:["Berlin","Madrid","Paris","Rome"],
answer:"Paris"
},

{
question:"Full form of HTML?",
options:[
"Hyper Text Markup Language",
"High Text Markup Language",
"Hyper Text Market Language",
"None"
],
answer:"Hyper Text Markup Language"
},

{
question:"What is Generative AI?",
options:[
"AI that generates new content",
"AI that understands language",
"AI that plays games",
"AI that recognizes images"
],
answer:"AI that generates new content"
},

{
question:"Founder of Microsoft?",
options:[
"Steve Jobs",
"Bill Gates",
"Mark Zuckerberg",
"Elon Musk"
],
answer:"Bill Gates"
}
{
question:"why we use css",
options:[
"To structure the content",
"To style the content",
"To add interactivity",
],
answer:"To style the content"
}
{
question:"DOM stands for?",
options:[
"Document Object Model",
"Data Object Model",
"Document Oriented Model",
"Data Oriented Model"
],
answer:"Document Object Model"
}

{
question:"waht does CreateElement do in JavaScript?",
options:[
"Creates a new HTML element",
"Deletes an HTML element",
"Updates an HTML element",
],
answer:"Creates a new HTML element"
}
{
question:"",
options:[
"Steve Jobs",
"Bill Gates",
"Mark Zuckerberg",
"Elon Musk"
],
answer:"Bill Gates"
}

]

let currentQuestion=0
let score=0
let wrong=0
let timer
let timeLeft=15

const questionEl=document.getElementById("question")
const optionsEl=document.getElementById("options")
const nextBtn=document.getElementById("nextBtn")
const timerEl=document.getElementById("timer")
const progress=document.getElementById("progress")
const answerInfo=document.getElementById("answer-info")

function loadQuestion(){

clearInterval(timer)

timeLeft=15
startTimer()

let q=quizData[currentQuestion]

questionEl.innerText=q.question

optionsEl.innerHTML=""
answerInfo.innerHTML=""

progress.style.width=(currentQuestion/quizData.length)*100+"%"

q.options.forEach(option=>{

let btn=document.createElement("button")
btn.innerText=option

btn.onclick=()=>selectAnswer(btn,option,q.answer)

optionsEl.appendChild(btn)

})

}

function startTimer(){

timerEl.innerText="⏱ "+timeLeft+"s"

timer=setInterval(()=>{

timeLeft--

timerEl.innerText="⏱ "+timeLeft+"s"

if(timeLeft<=0){

clearInterval(timer)
showCorrectAnswer()

}

},1000)

}

function selectAnswer(button,option,correct){

clearInterval(timer)

let buttons=document.querySelectorAll(".options button")

buttons.forEach(btn=>btn.disabled=true)

if(option===correct){

button.classList.add("correct")
score++

}else{

button.classList.add("wrong")
wrong++
showCorrectAnswer()

}

}

function showCorrectAnswer(){

let q=quizData[currentQuestion]

let buttons=document.querySelectorAll(".options button")

buttons.forEach(btn=>{

if(btn.innerText===q.answer){

btn.classList.add("correct")

}

})

answerInfo.innerText="Correct Answer: "+q.answer

}

nextBtn.onclick=()=>{

currentQuestion++

if(currentQuestion<quizData.length){

loadQuestion()

}else{

showResult()

}

}

function showResult(){

document.querySelector(".box").style.display="none"

let result=document.getElementById("result")

result.classList.remove("hidden")

let percent=Math.round((score/quizData.length)*100)

document.getElementById("scorePercent").innerText=percent+"%"

document.getElementById("correct").innerText="Correct Answers: "+score

document.getElementById("wrong").innerText="Wrong Answers: "+wrong

}

loadQuestion()