const questions = [

{
question:"What is the capital of France?",
options:["Berlin","Madrid","Paris","Rome"],
answer:"Paris"
},

{
question:"What is the complete form of HTML?",
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
question:"What does createElement do in JavaScript?",
options:[
"Creates a new HTML element",
"Removes an element",
"Modifies an element",
"None"
],
answer:"Creates a new HTML element"
}

];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion(){

let q = questions[currentQuestion];

questionEl.innerText = q.question;

optionsEl.innerHTML = "";

q.options.forEach(option => {

let button = document.createElement("button");
button.innerText = option;

button.onclick = () => checkAnswer(button, option);

optionsEl.appendChild(button);

});

}

function checkAnswer(button, option){

let correctAnswer = questions[currentQuestion].answer;

let buttons = optionsEl.querySelectorAll("button");

buttons.forEach(btn => btn.disabled = true);

if(option === correctAnswer){

button.classList.add("correct");
score++;

}else{

button.classList.add("wrong");

buttons.forEach(btn => {
if(btn.innerText === correctAnswer){
btn.classList.add("correct");
}
});

}

nextBtn.style.display = "block";

}

nextBtn.onclick = () => {

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();
nextBtn.style.display="none";

}else{

showScore();

}

};

function showScore(){

questionEl.innerHTML = `🎉 Quiz Finished! <br> Your Score: ${score}/${questions.length}`;

optionsEl.innerHTML = "";

nextBtn.style.display = "none";

}

loadQuestion();