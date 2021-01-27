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
{ question: "Who created Linux?", 
  answers: [ "Justin Bieber", "Johnathan Bell", "Linus Torvalds" ],
  correct: "Linus Torvalds" },
{ question: "Who invented the iPhone?", 
  answers: [ "Hewlett Packard", "Steve Jobs", "Steve Jacobs" ],
  correct: "Steve Jobs" },
{ question: "Who invented the internet?",
  answers: [ "Aliens", "Europe", "DARPA" ],
  correct: "DARPA" }
]


function startQuiz(){
questionNum = 0
totScore = 0
showNextQuestion()
timerStart()
}          

function timerStart(){
    countdownValue = document.querySelector('#timer').innerHTML
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
    }
    questionNum++
    if(questionNum > 2){
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