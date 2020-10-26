var startBtn = document.getElementById("start-btn");
var startContainer = document.getElementById("start-container");
var questionContainer = document.getElementById("question-container");
var endContainer = document.getElementById("end-container");

var questionTitle = document.querySelector("#question-container .question");
var choice1 = document.querySelector("#question-container #choice-1");
var choice2 = document.querySelector("#question-container #choice-2");
var choice3 = document.querySelector("#question-container #choice-3");
var choice4 = document.querySelector("#question-container #choice-4");

var timer;
var time = 75;
var score = 0;
var index = 0;

var questions = [
    {
        question: "What city does Batman protect?",
        choices: ["Metropolis", "New York", "Gotham", "Central City"],
        answer: "Gotham"
    },
    {
        question: "Which hero get's stronger as they get angrier?",
        choices: ["Superman", "Hulk", "Ironman", "Shazaam"],
        answer: "Hulk"
    },
    {
        question: "Who is the fastest DC hero?",
        choices: ["Green Arrow", "Superman", "Batman", "Flash"],
        answer: "Flash"
    },
    {
        question: "Which of the following heroes is from Queens, New York?",
        choices: ["Hawkeye", "Spider-man", "Iron-man", "Thor"],
        answer: "Spider-man"
    }
];

function startQuiz() {
    //hide the start button
    startContainer.classList.add("hide");
    //show the question contianer
    questionContainer.classList.remove("hide");
    //start the timer
    timer = setInterval(function () {
        //subtract time
        time--;
        //show updated time
        document.querySelector(".timer").textContent = time;
        //end time end quiz
        if (time <= 0) {
            document.querySelector("#end-container h3").textContent = "You ran out of time!";
            endQuiz();
        }
    }, 1000);
    //generateQuestion
    generateQuestion()
};

function generateQuestion() {
    //put the question in the right place
    questionTitle.textContent = questions[index].question;
    //fill out choice
    choice1.textContent = questions[index].choices[0];
    choice2.textContent = questions[index].choices[1];
    choice3.textContent = questions[index].choices[2];
    choice4.textContent = questions[index].choices[3];
};

function endQuiz() {
    //hide question container
    questionContainer.classList.add("hide");
    //show the end container
    endContainer.classList.remove("hide");
    //update the final score
    document.querySelector("#final-score").textContent = score;
    //clear the interval
    clearInterval(timer);
};

startBtn.addEventListener("click", startQuiz);

var choiceArray = document.querySelectorAll("#question-container .answer-choice");
for (let i = 0; i < choiceArray.length; i++) {
    choiceArray[i].addEventListener("click", function (event) {
        processAnswers(event);
    });
}

function processAnswers(event) {
    //check if last question
    setTimeout(function() {
        // Hide "correct!" notification
        if (document.querySelector("#correct").classList.contains("hide") === false) {
            document.querySelector("#correct").classList.add("hide");
        }
        else if (document.querySelector("#wrong").classList.contains("hide") === false) {
            document.querySelector("#wrong").classList.add("hide");
        };
        if (index === questions.length) {
            endQuiz();
        }
        //show next question
        else {
            generateQuestion();
        };
    }, 500);
    //check if the answer is correct
    if (event.target.textContent === questions[index].answer) {
        //add score
        score = score + 25;
        // show that they're correct
        document.querySelector("#correct").classList.remove("hide");
    } else {
        //decrease timer
        time = time - 15;
        // show that they're wrong
        document.querySelector("#wrong").classList.remove("hide");
    };
    //increase the index
    index++;
    
}

//submit function
document.querySelector(".submit-btn").addEventListener("click", storeData);

function storeData() {
    // create a place to store data if there is none
    if (localStorage.getItem("data") === null) {
        var data = [];
        localStorage.setItem("data", JSON.stringify(data));
    }
    //get the input box value in a var
    var userInput = document.querySelector("#end-container input");
    //check if input is not empty
    if (userInput !== "") {
        //get the old data
        data = JSON.parse(localStorage.getItem("data"));
        //create the new data
        var newDatum = userInput.value + "-" + score;
        //add the new data to old data
        data.push(newDatum);
        //store it
        localStorage.setItem("data", JSON.stringify(data));
        //redirect the user to other html
        window.location.replace("highscores.html");
        
        };
}
