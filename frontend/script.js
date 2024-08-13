document.getElementById('buildForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const character = document.getElementById('character').value;
    document.getElementById('buildOutput').innerText = `Build for ${character} is being calculated...`;
    // Ajouter ici la logique pour calculer les statistiques du build
});
