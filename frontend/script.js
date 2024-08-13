document.addEventListener('DOMContentLoaded', function() {
    const championSelect = document.getElementById('champion');
    const weaponList = document.getElementById('weaponList');
    const augmentList = document.getElementById('augmentList');
    const selectedItemsTable = document.getElementById('selectedItemsTable').querySelector('tbody');

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
                // Ajouter les armes du champion à la liste totale
                champion.items.forEach(item => {
                    if (!allWeapons.includes(item)) {
                        allWeapons.push(item);
                    }
                });
                // Ajouter les augmentations du champion à la liste totale
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
                // Tu peux ajouter ici des actions spécifiques liées au changement de champion.
            });
        });

    function renderWeaponsAndAugments() {
        weaponList.innerHTML = '';  // Réinitialiser la liste des armes
        augmentList.innerHTML = '';  // Réinitialiser la liste des augmentations

        allWeapons.forEach(weaponName => {
            let weaponTag = document.createElement('div');
            weaponTag.textContent = weaponName;
            weaponTag.classList.add('weapon-tag');
            weaponTag.onclick = function() {
                addItemToTable('Weapon', weaponName);
                weaponTag.remove(); // Retirer l'étiquette après l'ajout au tableau
            };
            weaponList.appendChild(weaponTag);
        });

        allAugments.forEach(augment => {
            let augmentTag = document.createElement('div');
            augmentTag.textContent = augment;
            augmentTag.classList.add('augment-tag');
            augmentTag.onclick = function() {
                addItemToTable('Augment', augment);
                augmentTag.remove(); // Retirer l'étiquette après l'ajout au tableau
            };
            augmentList.appendChild(augmentTag);
        });
    }

    function addItemToTable(type, name) {
        const row = document.createElement('tr');
        const typeCell = document.createElement('td');
        const nameCell = document.createElement('td');
        
        typeCell.textContent = type;
        nameCell.textContent = name;
        
        row.appendChild(typeCell);
        row.appendChild(nameCell);
        selectedItemsTable.appendChild(row);
    }
});
