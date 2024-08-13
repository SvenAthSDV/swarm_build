const testWeapons = ["Test Weapon 1", "Test Weapon 2"];
const testAugments = ["Test Augment 1", "Test Augment 2"];

testWeapons.forEach(weaponName => {
    let weaponTag = document.createElement('div');
    weaponTag.textContent = weaponName;
    weaponList.appendChild(weaponTag);
});

testAugments.forEach(augmentName => {
    let augmentTag = document.createElement('div');
    augmentTag.textContent = augmentName;
    augmentList.appendChild(augmentTag);
});
