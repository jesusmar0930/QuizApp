document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const loginContainer = document.querySelector('.login-container');
    const registrationContainer = document.querySelector('.registration-container');

    registerLink.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registrationContainer.style.display = 'block';
    });

    loginLink.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        registrationContainer.style.display = 'none';
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if user exists in local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            alert('Login successful');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'quiz.html'; // Redirect to the quiz page
        } else {
            alert('Invalid username or password');
        }
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('reg-password').value;

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.username === username);

        if (existingUser) {
            alert('User already exists');
        } else {
            // Add new user to local storage
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful. Please login.');
            loginContainer.style.display = 'block';
            registrationContainer.style.display = 'none';
        }
    });
});
