async function doSignup() {
    const user = document.getElementById('signupUser').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pass = document.getElementById('signupPass').value;

    if (user === '' || email === '' || pass === '') {
        alert('Please fill in all fields.');
        return;
    }
    if (!email.includes('@')) {
        alert('Please enter a valid email.');
        return;
    }

    const accounts = getAccounts();
    if (accounts[user]) {
        alert('This username already exists. Please log in.');
        return;
    }

    accounts[user] = { email: email, password: pass };
    saveAccounts(accounts);

    // NOUVEAU : on envoie l'email de bienvenue via le serveur
    try {
        await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email: email })
        });
    } catch (e) {
        console.log('Email non envoyé:', e);
    }

    loginUser(user, email);
    closeLogin();
    clearForms();
}const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Erreur : index.html introuvable');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port ' + PORT);
});
