const express = require('express');
const path = require('path');
const app = express();

// Définir le répertoire qui contient les fichiers frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.1.33:${PORT}`);
});
