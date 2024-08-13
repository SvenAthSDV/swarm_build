document.addEventListener('DOMContentLoaded', function() {
    const championSelect = document.getElementById('champion');
    const weaponsSelect = document.getElementById('weapons');
    const passivesDiv = document.getElementById('passives');

    // Charger les données des champions
    fetch('/champions')
        .then(response => response.json())
        .then(champions => {
            champions.forEach(champion => {
                let option = document.createElement('option');
                option.value = champion.name;
                option.textContent = champion.name;
                championSelect.appendChild(option);
            });

            // Ajouter un événement sur le changement de sélection de champion
            championSelect.addEventListener('change', function() {
                const selectedChampion = champions.find(c => c.name === championSelect.value);
                
                // Afficher les armes associées au champion sélectionné
                weaponsSelect.innerHTML = '';  // Réinitialiser la sélection des armes
                selectedChampion.weapons.forEach(weaponName => {
                    let option = document.createElement('option');
                    option.value = weaponName;
                    option.textContent = weaponName;
                    weaponsSelect.appendChild(option);
                });

                // Afficher les passifs recommandés
                passivesDiv.innerHTML = `<h2>Recommended Passives for ${selectedChampion.name}:</h2>`;
                selectedChampion.recommended_passives.forEach(passive => {
                    passivesDiv.innerHTML += `<p>${passive}</p>`;
                });
            });
        });

    // Charger les données des armes et afficher les descriptions
    fetch('/weapons')
        .then(response => response.json())
        .then(weapons => {
            weaponsSelect.addEventListener('change', function() {
                const selectedWeapon = weapons.find(w => w.name === weaponsSelect.value);
                if (selectedWeapon) {
                    passivesDiv.innerHTML += `<h3>${selectedWeapon.full_name}</h3>`;
                    passivesDiv.innerHTML += `<p><strong>Function:</strong> ${selectedWeapon.function}</p>`;
                    passivesDiv.innerHTML += `<p><strong>Evolve Effect:</strong> ${selectedWeapon.evolve} - ${selectedWeapon.evolve_effect}</p>`;
                }
            });
        });
});
