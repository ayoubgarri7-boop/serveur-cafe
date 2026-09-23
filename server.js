const http = require('http');
const fs = require('fs');
const { Resend } = require('resend');

// La cle API vient des variables secretes de Render (jamais dans le code !)
const resend = new Resend(process.env.RESEND_API_KEY);

const server = http.createServer((req, res) => {

    // --- Quand quelqu'un s'inscrit : on envoie l'email de bienvenue ---
    if (req.method === 'POST' && req.url === '/signup') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);

                await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: data.email,
                    subject: 'Bienvenue chez Ayoub Coffee !',
                    html: '<h1>Bienvenue ' + data.username + ' !</h1>'
                        + '<p>Merci d\'avoir cree ton compte sur Ayoub Coffee.</p>'
                        + '<p>A bientot pour un bon cafe !</p>'
                });

                console.log('Email envoye a ' + data.email);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));

            } catch (err) {
                console.log('Erreur email :', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // --- Sinon : on sert le site (index.html) ---
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
    console.log('Serveur demarre sur le port ' + PORT);
});
