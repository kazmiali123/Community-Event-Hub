document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Get the form data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple client-side validation
        if (username && password) {
            // For example, using the Fetch API:
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => response.json())
                .then(data => {
                    // Handle response data
                    if (data.success) {
                        window.location.href = '/dashboard'; // Redirect to the dashboard on success
                    } else {
                        // Display an error message
                        alert('Login failed: ' + data.message);
                    }
                })
                .catch(error => {
                    // Handle any other errors
                    console.error('Error during login:', error);
                });
        } else {
            // If validation fails, show an alert
            alert('Please enter both username and password.');
        }
    });
});
