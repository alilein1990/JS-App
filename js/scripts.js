pokemonList = [
    {name: 'Bulbasaur', height: 70, types: ['grass', ' poison']}, 
    {name: 'Butterfree', height: 110, types: ['bug', ' flying']}, 
    {name: 'Ariados', height: 110, types: ['bug', ' poison']}, 
    {name: 'Slowbro', height: 160, types: ['psychic', ' water']}
];

for(i = 0; i < pokemonList.length; i++){
    document.write(`<div>${pokemonList[i].name}: Height: ${pokemonList[i].height} / Types: ${pokemonList[i].types} </div>`);
}