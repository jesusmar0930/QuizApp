document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // If not logged in, redirect to the login/registration page
        window.location.href = 'login-registration.html'; // Replace 'login-registration.html' with the filename of your login/registration page
    } else {
        // If logged in, continue with quiz functionality
        const quizzes = {
            generalKnowledge: [
                { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
                { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
                { question: "What year did the Titanic sink in the Atlantic Ocean?", options: ["1912", "1923", "1905", "1898"], answer: "1912" },
                { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Hydrogen", "Calcium"], answer: "Oxygen" },
            ],
            popCulture: [
                { question: "Who is known as the Queen of Pop?", options: ["Madonna", "Lady Gaga", "Britney Spears", "Rihanna"], answer: "Madonna" },
                { question: "Which movie features the song 'Let It Go'?", options: ["Frozen", "Tangled", "Moana", "Coco"], answer: "Frozen" },
                { question: "Who played Jack Dawson in Titanic?", options: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Johnny Depp"], answer: "Leonardo DiCaprio" },
                { question: "What is the highest-selling video game of all time as of 2020?", options: ["Minecraft", "Tetris", "Grand Theft Auto V", "Wii Sports"], answer: "Minecraft" },
            ],
            scienceAndNature: [
                { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
                { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
                { question: "How many planets are in our solar system?", options: ["8", "9", "7", "10"], answer: "8" },
                { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], answer: "Nitrogen" },
            ],
            history: [
                { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
                { question: "In which year did World War I begin?", options: ["1914", "1905", "1918", "1923"], answer: "1914" },
                { question: "What ancient civilization built the Machu Picchu complex in Peru?", options: ["The Mayans", "The Incas", "The Aztecs", "The Olmecs"], answer: "The Incas" },
                { question: "Which empire was ruled by Genghis Khan?", options: ["The Mongol Empire", "The Roman Empire", "The Ottoman Empire", "The Persian Empire"], answer: "The Mongol Empire" },
            ]
        };

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;

        document.body.addEventListener('click', function(event) {
            if (event.target.classList.contains('quiz-select-btn')) {
                const selectedQuiz = quizzes[event.target.getAttribute('data-quiz')];
                currentQuestions = selectedQuiz;
                currentQuestionIndex = 0;
                score = 0;

                setupQuizUI(); // Ensure the UI is ready for displaying questions
                displayQuestion();

                document.getElementById('quiz-selection').style.display = 'none';
                document.querySelector('.quiz-container').style.display = 'block';
            } else if (event.target.id === 'restartBtn' || event.target.classList.contains('restartBtn')) {
                restartQuiz();
            }
        });

        function setupQuizUI() {
            const quizContainer = document.querySelector('.quiz-container');
            if (!quizContainer) {
                console.error('Quiz container not found. Cannot setup quiz UI.');
                return;
            }
        
            // Clear existing content
            quizContainer.innerHTML = '';
        
            // Create and append question element
            const questionEl = document.createElement('div');
            questionEl.id = 'question';
            quizContainer.appendChild(questionEl);
        
            // Create and append options container
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            quizContainer.appendChild(optionsContainer);
        
            // Generate option buttons (adjust based on your number of options)
            currentQuestions[currentQuestionIndex].options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.className = 'btn btn-primary option-button';
                optionButton.textContent = option;
                optionButton.onclick = () => handleAnswer(option); // Set onclick event here
                optionsContainer.appendChild(optionButton);
            });
        
            // Ensure submit button is available (if your quiz flow requires a submit button)
            const submitBtn = document.createElement('button');
            submitBtn.id = 'submitBtn';
            submitBtn.className = 'btn btn-success mt-3';
            //submitBtn.textContent = 'Submit Answer';
            submitBtn.style.display = 'none'; // Initially hidden, shown when needed
            quizContainer.appendChild(submitBtn);
        
            // Create and append feedback element
            const feedbackEl = document.createElement('div');
            feedbackEl.id = 'feedback'; // Ensure this ID matches what's used in handleAnswer
            quizContainer.appendChild(feedbackEl);
        }
        

        function displayQuestion() {
            const questionEl = document.getElementById('question');
            const optionsEls = document.querySelectorAll('.option-button');

            if (!questionEl || optionsEls.length === 0) {
                console.error('One or more essential elements for displaying the question are missing.');
                return;
            }

            questionEl.textContent = currentQuestions[currentQuestionIndex].question;
            currentQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (optionsEls[index]) {
                    optionsEls[index].textContent = option;
                    optionsEls[index].onclick = () => handleAnswer(option);
                }
            });
            document.getElementById('submitBtn').style.display = 'block';
        }

        function handleAnswer(selectedOption) {
            const feedbackEl = document.getElementById('feedback');
            if (!feedbackEl) {
                console.error('Feedback element not found in the DOM');
                return;
            }

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
            if (!quizContainer) {
                console.error('Quiz container not found in the DOM');
                return;
            }

            quizContainer.innerHTML = `<h2>Your final score is ${score}/${currentQuestions.length}</h2>
            <button id="restartBtn" class="btn btn-primary mt-3">Restart Quiz</button>`;
        }

        function resetQuizUIAndState() {
            score = 0;
            currentQuestionIndex = 0;
        }

        function restartQuiz() {
            document.querySelector('.quiz-container').style.display = 'none';
            document.getElementById('quiz-selection').style.display = 'block';
            resetQuizUIAndState(); // Ensures UI elements and state are reset
        }
    }
});