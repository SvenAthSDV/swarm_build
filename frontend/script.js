document.addEventListener('DOMContentLoaded', function() {
    const weaponList = document.getElementById('weaponList');
    const augmentList = document.getElementById('augmentList');
    const selectedItemsTable = document.getElementById('selectedItemsTable').querySelector('tbody');

    // Charger les données des champions
    fetch('/champions')
        .then(response => response.json())
        .then(champions => {
            // Récupérer toutes les armes et augmentations disponibles
            let allWeapons = [];
            let allAugments = [];

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
            weaponList.innerHTML = '';  // Réinitialiser la liste des armes
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

            // Afficher toutes les augmentations disponibles
            augmentList.innerHTML = '';  // Réinitialiser la liste des augmentations
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
        });

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
