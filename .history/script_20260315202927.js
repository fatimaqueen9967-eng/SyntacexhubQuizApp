// Quiz Data
const quizData=[
{
question:"What is the capital of France?",
options:["Berlin","Madrid","Paris","Rome"],
answer:"Paris"
},
{
question:"Full form of HTML?",
options:["Hyper Text Markup Language","High Text Markup Language","Hyper Text Market Language","None"],
answer:"Hyper Text Markup Language"
},
{
question:"Founder of Microsoft?",
options:["Steve Jobs","Bill Gates","Mark Zuckerberg","Elon Musk"],
answer:"Bill Gates"
},
{
question:"Why do we use CSS?",
options:["To structure the content","To style the content","To add interactivity"],
answer:"To style the content"
},
{
question:"DOM stands for?",
options:["Document Object Model","Data Object Model","Document Oriented Model","Data Oriented Model"],
answer:"Document Object Model"
},
{
question:"What does CreateElement do in JavaScript?",
options:["Creates a new HTML element","Deletes an HTML element","Updates an HTML element"],
answer:"Creates a new HTML element"
},
{
question:"What is Bootstrap?",
options:["A CSS framework","A JavaScript library","A Python framework"],
answer:"A CSS framework"
}
]

// DOM Elements
let currentQuestion=0
let score=0
let wrong=0
let timer
let timeLeft=15

const startBtn=document.getElementById("startBtn")
const startScreen=document.getElementById("startScreen")
const totalQ=document.getElementById("totalQ")
const counter=document.getElementById("counter")

const questionEl=document.getElementById("question")
const optionsEl=document.getElementById("options")
const nextBtn=document.getElementById("nextBtn")
const timerEl=document.getElementById("timer")
const progress=document.getElementById("progress")
const answerInfo=document.getElementById("answer-info")

// Show total questions on start screen
totalQ.innerText=quizData.length

// Start Quiz
startBtn.onclick=()=>{
    startScreen.classList.add("hidden")
    document.querySelector(".box").classList.remove("hidden")
    loadQuestion()
}

// Load Question
function loadQuestion(){
    clearInterval(timer)
    timeLeft=15
    startTimer()

    let q=quizData[currentQuestion]
    questionEl.innerText=q.question
    optionsEl.innerHTML=""
    answerInfo.innerHTML=""

    // Progress bar
    progress.style.width=(currentQuestion/quizData.length)*100+"%"

    // Question counter
    counter.innerText=(currentQuestion+1)+" / "+quizData.length

    // Options buttons
    q.options.forEach(option=>{
        let btn=document.createElement("button")
        btn.innerText=option
        btn.onclick=()=>selectAnswer(btn,option,q.answer)
        optionsEl.appendChild(btn)
    })
}

// Timer Function
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

// Select Answer
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

// Show Correct Answer
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

// Next Button
nextBtn.onclick=()=>{
    currentQuestion++
    if(currentQuestion<quizData.length){
        loadQuestion()
    }else{
        showResult()
    }
}

// Show Result
function showResult(){
    document.querySelector(".box").style.display="none"
    let result=document.getElementById("result")
    result.classList.remove("hidden")

    let percent=Math.round((score/quizData.length)*100)
    document.getElementById("scorePercent").innerText=percent+"%"
    document.getElementById("correct").innerText="Correct Answers: "+score
    document.getElementById("wrong").innerText="Wrong Answers: "+wrong
}