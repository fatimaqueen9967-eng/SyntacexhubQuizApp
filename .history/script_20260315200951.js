
const quizData = [

{
question: "What is the capital of France?",
options: ["Berlin","Madrid","Paris","Rome"],
answer: "Paris"
},

{
question: "What is the complete form of HTML?",
options: [
"Hyper Text Markup Language",
"High Text Markup Language",
"Hyper Text Market Language",
"None"
],
answer: "Hyper Text Markup Language"
},

{
question: "What is Generative AI?",
options:[
"AI that generates new content",
"AI that understands natural language",
"AI that can play games",
"AI that can recognize images"
],
answer:"AI that generates new content"
},

{
question:"COMPUTER stands for?",
options:[
"Common Operating Machine Programming Element",
"Common operation mechanics program electricity",
"Computer Operating Machine Programming Element",
"Computer operation mechanics program electricity"
],
answer:"Common Operating Machine Programming Element"
},

{
question:"What is the role of JavaScript in web development?",
options:[
"Adds interactivity to web pages",
"Styles web pages",
"Structures web pages",
"None"
],
answer:"Adds interactivity to web pages"
},

{
question:"DOM stands for?",
options:[
"Document Object Model",
"Data Object Model",
"Document Oriented Model",
"Data Oriented Model"
],
answer:"Document Object Model"
},

{
question:"What is CSS?",
options:[
"CSS is a language used to style web pages",
"Body of a page",
"Head of a page",
"None"
],
answer:"CSS is a language used to style web pages"
},

{
question:"Who is the founder of Microsoft?",
options:[
"Steve Jobs",
"Bill Gates",
"Mark Zuckerberg",
"Elon Musk"
],
answer:"Bill Gates"
},

{
question:"What is Bootstrap?",
options:[
"A CSS framework",
"A JavaScript library",
"A front-end framework",
"A back-end framework"
],
answer:"A front-end framework"
},

{
question:"Full form of CSS?",
options:[
"Cascading Style Sheets",
"Computer Style Sheets",
"Creative Style Sheets",
"Colorful Style Sheets"
],
answer:"Cascading Style Sheets"
}

];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");


function loadQuestion(){

let q = quizData[currentQuestion];

questionEl.innerText = q.question;

optionsEl.innerHTML = "";

q.options.forEach(option => {

let button = document.createElement("button");
button.innerText = option;

button.onclick = () => {

if(option === q.answer){
score++;
}

currentQuestion++;

if(currentQuestion < quizData.length){
loadQuestion();
}
else{
showResult();
}

};

optionsEl.appendChild(button);

});

}

function showResult(){

questionEl.innerText = "Quiz Finished 🎉";

optionsEl.innerHTML = "Your Score: " + score + " / " + quizData.length;

nextBtn.style.display = "none";

}

loadQuestion();