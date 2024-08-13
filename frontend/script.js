document.addEventListener('DOMContentLoaded', function() {
    const championSelect = document.getElementById('champion');
    const weaponList = document.getElementById('weaponList');
    const augmentList = document.getElementById('augmentList');
    const selectedWeaponsTable = document.getElementById('selectedWeaponsTable').querySelector('tbody');
    const selectedAugmentsTable = document.getElementById('selectedAugmentsTable').querySelector('tbody');

    let allWeapons = [];
    let allAugments = [];

    // Charger les données des champions
    fetch('/champions')
        .then(response => response.json())
        .then(champions => {
            // Ajouter les options du sélecteur de champion
            champions.forEach(champion => {
                let option = document.createElement('option');
                option.value = champion.name;
                option.textContent = champion.name;
                championSelect.appendChild(option);
            });

            // Récupérer toutes les armes et augmentations disponibles
            champions.forEach(champion => {
                champion.items.forEach(item => {
                    if (!allWeapons.some(weapon => weapon.name === item.name)) {
                        allWeapons.push(item);
                    }
                });
                champion.augments.forEach(augment => {
                    if (!allAugments.includes(augment)) {
                        allAugments.push(augment);
                    }
                });
            });

            // Afficher toutes les armes disponibles
            renderWeaponsAndAugments();

            // Gérer le changement de sélection de champion
            championSelect.addEventListener('change', function() {
                const selectedChampion = champions.find(c => c.name === championSelect.value);
                console.log('Selected champion:', selectedChampion);
            });
        });

    function renderWeaponsAndAugments() {
        weaponList.innerHTML = '';  // Réinitialiser la liste des armes
        augmentList.innerHTML = '';  // Réinitialiser la liste des augmentations

        allWeapons.forEach(weapon => {
            let weaponTag = document.createElement('div');
            weaponTag.textContent = weapon.name;
            weaponTag.classList.add('weapon-tag');
            weaponTag.onclick = function() {
                addWeaponToTable(weapon.name, weapon.evolve);
                weaponTag.remove(); // Retirer l'étiquette après l'ajout au tableau
            };
            weaponList.appendChild(weaponTag);
        });

        allAugments.forEach(augment => {
            let augmentTag = document.createElement('div');
            augmentTag.textContent = augment;
            augmentTag.classList.add('augment-tag');
            augmentTag.onclick = function() {
                addAugmentToTable(augment);
                augmentTag.remove(); // Retirer l'étiquette après l'ajout au tableau
            };
            augmentList.appendChild(augmentTag);
        });
    }

    function addWeaponToTable(name, evolve) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const evolveCell = document.createElement('td');
        
        nameCell.textContent = name;
        evolveCell.textContent = evolve;
        
        row.appendChild(nameCell);
        row.appendChild(evolveCell);
        selectedWeaponsTable.appendChild(row);
    }

    function addAugmentToTable(name) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        
        nameCell.textContent = name;
        
        row.appendChild(nameCell);
        selectedAugmentsTable.appendChild(row);
    }
});
