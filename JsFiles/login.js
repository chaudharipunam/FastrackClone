async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            rememberMe: rememberMe,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful');
        // Handle successful login (e.g., redirect to another page)
    } else {
        alert('Login failed: ' + data.message);
    }
}
