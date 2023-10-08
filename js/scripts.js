pokemonList = [
    { name: 'Bulbasaur', height: 70, types: ['grass', ' poison'] },
    { name: 'Butterfree', height: 110, types: ['bug', ' flying'] },
    { name: 'Ariados', height: 110, types: ['bug', ' poison'] },
    { name: 'Slowbro', height: 160, types: ['psychic', ' water'] }
];

// Loops through the array of pokemon and points out which ones height is <= 70
for (i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height <= 70) {
        document.write(`<div>${pokemonList[i].name}: 
        Height: ${pokemonList[i].height} / 
        Types: ${pokemonList[i].types} - Tiny pokemon </div>`);

    } else {
        document.write(`<div>${pokemonList[i].name}: 
        Height: ${pokemonList[i].height} / 
        Types: ${pokemonList[i].types} </div>`);
    }
}