const quizzes = {
    generalKnowledge: [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        // Add more general knowledge questions here
    ],
    popCulture: [
        { question: "Who is known as the Queen of Pop?", options: ["Madonna", "Lady Gaga", "Britney Spears", "Rihanna"], answer: "Madonna" },
        // Add more pop culture questions here
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

document.querySelectorAll('.quiz-select-btn').forEach(button => {
    button.addEventListener('click', function() {
        const selectedQuiz = quizzes[this.getAttribute('data-quiz')];
        currentQuestions = selectedQuiz;
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
        document.getElementById('quiz-selection').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';
    });
});

function displayQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEls = document.querySelectorAll('.option-button');
    
    questionEl.textContent = currentQuestions[currentQuestionIndex].question;
    currentQuestions[currentQuestionIndex].options.forEach((option, index) => {
        optionsEls[index].textContent = option;
        optionsEls[index].onclick = () => handleAnswer(option);
    });
    document.getElementById('submitBtn').style.display = 'block';
}

function handleAnswer(selectedOption) {
    const feedbackEl = document.getElementById('feedback');
    if (selectedOption === currentQuestions[currentQuestionIndex].answer) {
        feedbackEl.textContent = "Correct!";
        score++;
    } else {
        feedbackEl.textContent = "Wrong answer. Try again!";
    }
    
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            feedbackEl.textContent = '';
        } else {
            displayResults();
        }
    }, 1000);
}

function displayResults() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `<h2>Your final score is ${score}/${currentQuestions.length}</h2>
    <button id="restartBtn" class="btn btn-primary mt-3">Restart Quiz</button>`;
    
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('feedback').textContent = '';
    score = 0;
    currentQuestionIndex = 0;
}
