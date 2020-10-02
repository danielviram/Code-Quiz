// GATHERING HTML ELEMENTS AND MAKING THEM TO VARIABLES

// Q&A
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var questionsElement = document.getElementById("questions");

// HOME PAGE ELEMENTS
var startQuizBtn = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("homepage");
var highscoreDiv = document.getElementById("high-scorePage");
var quizMain = document.getElementById("quiz");

// TIMER
var quizTimer = document.getElementById("timer");

// HIGHSCORE
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreContainer = document.getElementById("highscoreContainer");

// END GAME
var resultsEl = document.getElementById("result");
var finalScoreElement = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var endGameBtns = document.getElementById("endGameBtns");



// QUIZ QUESTIONS
var quizQuestions = [{
    question: "Brazil was the colony of which country?",
    answerA: "Spain",
    answerB: "France",
    answerC: "Portugal",
    answerD: "Mexico",
    correctAnswer: "c"},
  {
    question: "How many favelas are estimated to be in Rio?",
    answerA: "600",
    answerB: "6000 ",
    answerC: "60",
    answerD: "160",
    correctAnswer: "a"},
   {
    question: "How many states are in Brazil?",
    answerA: "17",
    answerB: "26",
    answerC: "50",
    answerD: "32",
    correctAnswer: "b"},
    {
    question: "What day of the week does Rio's Carnival start?",
    answerA: "Friday",
    answerB: "Tuesday",
    answerC: "Sunday",
    answerD: "Thursday",
    correctAnswer: "d"},
    {
    question: "What language is spoken in Brazil?",
    answerA: "Portuguese",
    answerB: "English",
    answerC: "Spanish",
    answerD: "French",
    correctAnswer: "a"},  
    {
    question: "What is the capital of Brazil?",
    answerA: "Rio De Janeiro",
    answerB: "Sao Paulo",
    answerC: "Brasilia",
    answerD: "Salvador",
    correctAnswer: "c"},
    {
    question: "What dance is associated with Brazil?",
    answerA: "Salsa",
    answerB: "Samba",
    answerC: "Bachata",
    answerD: "Mambo",
    correctAnswer: "b"},
        
    
    ];
// OTHER VARIABLES
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.answerA;
    buttonB.innerHTML = currentQuestion.answerB;
    buttonC.innerHTML = currentQuestion.answerC;
    buttonD.innerHTML = currentQuestion.answerD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizMain.style.display = "block";
}

// THIS FUNCTIONS SHOWS YOUR SCORE AT THE END
function showScore(){
    quizMain.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreElement.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


// THIS FUNCTION YOU CAN SEE THE HIGH SCORE THAT IS SAVED IN THE LOCAL STORAGE 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// THIS FUNCTION GENERATES HIGH SCORES FROM LOCAL STORAGE
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// THIS FUNCTIONS DISPLAYS HIGH SCORE 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// THIS FUNCTION CLEARS SCORE 
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// THIS FUNCTION SETS ALL VARIABLES TO ORIGINAL VALUE AND YOU CAN REPLAY 
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// THIS FUNCTION CHECKS THE ANSWER OF EACH QUESTION
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// START QUIZ BTN
startQuizBtn.addEventListener("click",startQuiz);


