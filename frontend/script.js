document.addEventListener('DOMContentLoaded', function() {
    const championSelect = document.getElementById('champion');
    const weaponList = document.getElementById('weaponList');
    const augmentList = document.getElementById('augmentList');
    const selectedItemsTable = document.getElementById('selectedItemsTable').querySelector('tbody');

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

            championSelect.addEventListener('change', function() {
                const selectedChampion = champions.find(c => c.name === championSelect.value);
                
                // Afficher les armes associées au champion sélectionné
                weaponList.innerHTML = '';  // Réinitialiser la liste des armes
                selectedChampion.weapons.forEach(weaponName => {
                    let weaponTag = document.createElement('div');
                    weaponTag.textContent = weaponName;
                    weaponTag.onclick = function() {
                        addItemToTable('Weapon', weaponName);
                    };
                    weaponList.appendChild(weaponTag);
                });

                // Afficher les augmentations recommandées
                augmentList.innerHTML = '';  // Réinitialiser la liste des augmentations
                selectedChampion.augments.forEach(augment => {
                    let augmentTag = document.createElement('div');
                    augmentTag.textContent = augment;
                    augmentTag.onclick = function() {
                        addItemToTable('Augment', augment);
                    };
                    augmentList.appendChild(augmentTag);
                });
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
