const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    setNextQuestion();
});

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
    Array.from(answersElement.children).forEach(button => {
        button.classList.add(button.innerText === answer.text ? (correct ? 'correct' : 'incorrect') : '');
    });
    nextButton.classList.remove('hidden');
}

function showFeedback(isCorrect) {
    const feedbackMessage = document.createElement('div');
    feedbackMessage.innerText = isCorrect ? "Correct!" : "Incorrect!";
    feedbackMessage.classList.add('feedback');
    answersElement.appendChild(feedbackMessage);
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

// Start the quiz for the first time
setNextQuestion();
