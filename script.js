const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            }, {
                text: "Blue whale", correct: true
            }
            , {
                text: "Elephant", correct: false
            }
            , {
                text: "Girraffe", correct: false
            }
        ]
    },
    {
        question: "Which is the largest bird in the world?",
        answers: [
            {
                text: "Emo", correct: false
            }, {
                text: "Hemming Bird", correct: false
            }
            , {
                text: "Ostrich", correct: true
            }
            , {
                text: "Eagle", correct: false
            }
        ]
    },
    {
        question: "Which is the biggest continent in the world?",
        answers: [
            {
                text: "North America", correct: false
            }, {
                text: "Australia", correct: false
            }
            , {
                text: "Africa", correct: false 
            }
            , {
                text: "Asia", correct: true 
            }
        ]
    }
    ,
    {
        question: "Which is the longest river in the world?",
        answers: [
            {
                text: "Nile", correct: true 
            }, {
                text: "Great Ganga", correct: false
            }
            , {
                text: "Amazon", correct: false 
            }
            , {
                text: "Niger", correct: false 
            }
        ]
    },
    {
        question: "Which is the largest ocean in the world?",
        answers: [
            {
                text: "Pacific Ocean", correct: true 
            }, {
                text: "Arctic Ocean", correct: false
            }
            , {
                text: "Atlantic Ocean", correct: false 
            }
            , {
                text: "Indian Ocean", correct: false 
            }
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore() {
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();