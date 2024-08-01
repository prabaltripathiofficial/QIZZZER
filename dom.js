const questionsArray = [
    { question: "What is the name of the famous tourist spot in Paris?", option1: "Eiffel Tower", option2: "Louvre Museum", option3: "Notre-Dame Cathedral", option4: "Champs-Élysées", correct: 1 },
    // Add more trip-based questions here
];

const questionElement = document.getElementById("ques");
const options = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];
const questionNumberElement = document.getElementById("qno");
const nextButton = document.getElementById("btn3");
const previousButton = document.getElementById("btn4");
const questionButtons = document.getElementsByClassName("questions");
const timerDisplayMinutes = document.getElementById('minutes');
const timerDisplaySeconds = document.getElementById('seconds');
const submitButton = document.getElementById("submit");

let marked = JSON.parse(localStorage.getItem("marked")) || Array(12).fill(-1);
let answered = Number(localStorage.getItem("answered")) || 0;
let unAnswered = 12 - answered;
let markedForReview = Number(localStorage.getItem("markedForReview")) || 0;
let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;
let timer;
let timeLimit = 60; // 1 minute

window.onload = function() {
    startTimer();
    loadQuestion();
    updateCounters();
    colourChanger();
};

function startTimer() {
    let timeRemaining = timeLimit;

    timer = setInterval(function() {
        let min = Math.floor(timeRemaining / 60);
        let sec = timeRemaining % 60;

        timerDisplayMinutes.textContent = min < 10 ? '0' + min : min;
        timerDisplaySeconds.textContent = sec < 10 ? '0' + sec : sec;

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function previous() {
    if (marked[currentQuestion] === -1) {
        checker();
        if (marked[currentQuestion] !== -1) {
            answered++;
        }
        unAnswered = 12 - answered;
    }
    checker();
    updateCounters();

    if (marked[currentQuestion] !== -1) {
        document.getElementById("option" + marked[currentQuestion]).checked = false;
    }

    if (currentQuestion > 0) currentQuestion--;

    if (currentQuestion === 0) {
        previousButton.style.backgroundColor = '#55bcc9';
    } else {
        previousButton.style.backgroundColor = '#fc4445';
    }

    loadQuestion();
    nextButton.style.backgroundColor = '#fc4445';
    colourChanger();
    saveState();
}

function next() {
    if (marked[currentQuestion] === -1) {
        checker();
        if (marked[currentQuestion] !== -1) {
            answered++;
        }
        unAnswered = 12 - answered;
    }
    checker();
    updateCounters();

    if (marked[currentQuestion] !== -1) {
        document.getElementById("option" + marked[currentQuestion]).checked = false;
    }

    if (currentQuestion < 11) currentQuestion++;

    if (currentQuestion === 11) {
        nextButton.style.backgroundColor = '#55bcc9';
    } else {
        nextButton.style.backgroundColor = '#fc4445';
    }

    loadQuestion();
    previousButton.style.backgroundColor = '#fc4445';
    saveState();
}

function loadQuestion() {
    const q = questionsArray[currentQuestion];
    questionElement.textContent = q.question;
    options[0].nextElementSibling.querySelector('.option-label').textContent = q.option1;
    options[1].nextElementSibling.querySelector('.option-label').textContent = q.option2;
    options[2].nextElementSibling.querySelector('.option-label').textContent = q.option3;
    options[3].nextElementSibling.querySelector('.option-label').textContent = q.option4;

    document.getElementById("option" + marked[currentQuestion]).checked = true;
    questionNumberElement.textContent = "Question " + (currentQuestion + 1);
}

function colourChanger() {
    Array.from(questionButtons).forEach((btn, index) => {
        btn.style.backgroundColor = (index === currentQuestion) ? '#fc4445' : '#55bcc9';
    });
}

function gotoQuestion(num) {
    if (marked[currentQuestion] === -1) {
        checker();
        if (marked[currentQuestion] !== -1) {
            answered++;
        }
        unAnswered = 12 - answered;
    }
    checker();
    updateCounters();
    saveState();
    currentQuestion = num - 1;
    loadQuestion();
    colourChanger();
}

function checker() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        marked[currentQuestion] = parseInt(selectedOption.value);
    }
}

function updateCounters() {
    document.getElementById("answered").textContent = answered;
    document.getElementById("unAnswered").textContent = unAnswered;
    document.getElementById("markedForReview").textContent = markedForReview;
}

function flag() {
    if (marked[currentQuestion] !== -1) {
        markedForReview++;
    }
    updateCounters();
    saveState();
}

function submitQuiz() {
    checker();
    let correctAnswers = 0;
    marked.forEach((markedOption, index) => {
        if (markedOption === questionsArray[index].correct) {
            correctAnswers++;
        }
    });

    localStorage.setItem("ans", answered);
    localStorage.setItem("cor", correctAnswers);
    localStorage.setItem("wro", 12 - correctAnswers);
    localStorage.setItem("sco", correctAnswers);

    window.location.href = 'result.html';
}

function saveState() {
    localStorage.setItem("marked", JSON.stringify(marked));
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("answered", answered);
    localStorage.setItem("unAnswered", unAnswered);
    localStorage.setItem("markedForReview", markedForReview);
}
