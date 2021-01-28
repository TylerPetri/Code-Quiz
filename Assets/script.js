var countdownTimer
var countdownValue 
var questionNum
var totScore
var u = document.getElementById('nameEnter')
var x = document.getElementById('startQuiz')
var y = document.getElementById('questions')
var z = document.getElementById('scoreCard')

var infos = []


var questions = [
{ question: "Can a match box?", 
  answers: [ "Yes", "No", "No, but a tin can" ],
  correct: "No, but a tin can" },
{ question: "What can you put in a bucket to make it lighter?", 
  answers: [ "Gypsies", "Torch", "Canned laughter" ],
  correct: "Torch" },
{ question: "What is the 7th letter of the alphabet?",
  answers: [ "H", "I", "G" ],
  correct: "H" },
{ question: "The choice is yours",
  answers: ["+1 life", "-1 life", "+1 skip"],
  correct: "+1 skip"},
{ question: "How many holes in a polo?",
  answers: ["Two", "Three", "Four"],
  correct: "Four"},
{ question: "The answer is really big",
  answers: ["An elephant", "THE ANSWER", "Really Big"],
  correct: "An elephant"},
{ question: "Which of these places doesn't exist?",
  answers: ["Brown Willy", "Arsefacey", "Bitchfield"],
  correct: "Arsefacey"},
{ question: "What flavour is cardboard?",
  answers: ["Honey", "Pork scratchings", "Egg mayonnaise"],
  correct: "Egg mayonnaise"}
]


function startQuiz(){
questionNum = 0
totScore = 0
countdownValue = 60
document.querySelector('#tScore').textContent = null
showNextQuestion()
timerStart()
}          

function timerStart(){
    countdownValue = document.querySelector('#timer').textContent = countdownValue
    countdownTimer = setInterval( timerDecreaseAndDisplay, 1000 )
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
        if (y.classList.contains('d-none')){
            y.classList.remove('d-none')
        }
}

function wrongAnswer(){
    timerDecreaseAndDisplay(10)
}

function timerDecreaseAndDisplay( byValue=1 ){
countdownValue -= byValue
document.querySelector('#timer').textContent = countdownValue
    if( countdownValue<1 ){
    stopQuiz()
    }
}

function showNextQuestion(){
    var question = questions[questionNum]
    var questionEl = document.querySelector('#questionBox')
    questionEl.innerHTML = `
        <div class="row my-3">
            <h3 class="questionColor" >${question.question}</h3>
        </div>
        `
    for( var i=0; i < question.answers.length; i++ ){
    var answer = question.answers[i]
    questionEl.innerHTML += `
        <button onClick="selectAnswer(event,'${answer}')" class="btn rounded-0 border border-white" id="answerBTN">${answer}</button>
        `
    }
}
function selectAnswer(event,answer){
    event.preventDefault()
    if(answer === questions[questionNum].correct){
        totScore += 1000000
        } else {
            wrongAnswer()
        }
    questionNum++
    if(questionNum > 7){
        stopQuiz()
    } else { 
        showNextQuestion()
    }
    console.log(totScore)
}
function stopQuiz(){
    y.classList.add('d-none')
    u.classList.remove('d-none')
    clearInterval(countdownTimer) 
    if(JSON.parse(localStorage.getItem("infos")) !== null){
    infos = JSON.parse(localStorage.getItem("infos")) }  
}

function enterInfo(){
    event.preventDefault()
    var names = document.querySelector('#info-text').value

    if(names !== ""){
        var results = {
                        info: names,
                        scorez: totScore
                        }
        infos.push(results)
        localStorage.setItem("infos", JSON.stringify(infos))
        }
        renderInfo()
        u.classList.add('d-none')
        z.classList.remove('d-none')
    document.querySelector('#tScore').textContent += totScore
}

function renderInfo(){
    var highscores = JSON.parse(window.localStorage.getItem("infos")) || [];
  highscores.sort(function(a, b) {
    return b.scorez - a.scorez;
  });
  highscores.forEach(function(infos) {
    var liTag = document.createElement("li");
    liTag.textContent = infos.info + " - " + infos.scorez;
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
  if (highscores !== null) {
    infos = highscores;
  }
}

function tryAgain(){
    z.classList.add('d-none')
    x.classList.add('d-none')
    document.querySelector('#highscores').textContent = ""
    startQuiz()
}