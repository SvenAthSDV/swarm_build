document.addEventListener('DOMContentLoaded', function() {
    const championSelect = document.getElementById('champion');
    const weaponsSelect = document.getElementById('weapons');
    const passivesDiv = document.getElementById('passives');

    fetch('/champions')
        .then(response => response.json())
        .then(champions => {
            champions.forEach(champion => {
                let option = document.createElement('option');
                option.value = champion.name;
                option.textContent = champion.name;
                championSelect.appendChild(option);
            });

            championSelect.addEventListener('change', function() {
                const selectedChampion = champions.find(c => c.name === championSelect.value);
                
                // Populate weapons
                weaponsSelect.innerHTML = '';  // Clear previous options
                selectedChampion.weapons.forEach(weaponName => {
                    let option = document.createElement('option');
                    option.value = weaponName;
                    option.textContent = weaponName;
                    weaponsSelect.appendChild(option);
                });

                // Show recommended passives
                passivesDiv.innerHTML = `<h2>Recommended Passives for ${selectedChampion.name}:</h2>`;
                selectedChampion.recommended_passives.forEach(passive => {
                    passivesDiv.innerHTML += `<p>${passive}</p>`;
                });
            });
        });

    fetch('/weapons')
        .then(response => response.json())
        .then(weapons => {
            weapons.forEach(weapon => {
                let option = document.createElement('option');
                option.value = weapon.name;
                option.textContent = `${weapon.name} - ${weapon.function}`;
                weaponsSelect.appendChild(option);
            });
        });
});
