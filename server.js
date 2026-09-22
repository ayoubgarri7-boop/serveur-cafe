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

   
        // Envoyer l'email de bienvenue via le serveur
        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email: email })
        });
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port ' + PORT);
});
