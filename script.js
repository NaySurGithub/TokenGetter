document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    generateToken(email, password);
});

function generateToken(email, password) {
    fetch('https://discord.com/api/v9/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du token : ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        var token = data.token;
        var tokenDisplay = document.getElementById("token");
        var tokenParts = [];
        for (var i = 0; i < token.length; i += 7) {
            tokenParts.push(token.substring(i, i + 7));
        }
        tokenDisplay.innerText = tokenParts.join('\n');
        document.getElementById("token-display").classList.remove("hidden");
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du token :', error);
        var tokenDisplay = document.getElementById("token");
        tokenDisplay.innerText = 'Erreur : ' + error.message;
        document.getElementById("token-display").classList.remove("hidden");
    });
}
