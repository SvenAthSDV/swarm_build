const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Définir le chemin vers le fichier JSON contenant les données
const dataPath = path.join(__dirname, 'data', 'swarm_data.json');

// Charger les données depuis le fichier JSON
let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Configurer le serveur pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Route pour obtenir les champions
app.get('/champions', (req, res) => {
    res.json(data.champions);
});

// Route pour obtenir les armes
app.get('/weapons', (req, res) => {
    res.json(data.weapons);
});

// Route pour obtenir les augmentations (passifs)
app.get('/augments', (req, res) => {
    res.json(data.augments);
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
