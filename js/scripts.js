let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 70, types: ['grass', ' poison'] },
        { name: 'Butterfree', height: 110, types: ['bug', ' flying'] },
        { name: 'Ariados', height: 110, types: ['bug', ' poison'] },
        { name: 'Slowbro', height: 160, types: ['psychic', ' water'] }
    ];

    function getAll(){
        return pokemonList;
    }

    function add(pokemon){
        return pokemonList.push(pokemon);

    }

    return {
        getAll,
        add
         };
})();

// Loops through the array of pokemon and points out which ones height is <= 70
pokemonList.forEach(function (element) {
    if (element.height <= 70) {
        document.write(`<div>${element.name}: 
        Height: ${element.height} / 
        Types: ${element.types} - Tiny pokemon </div>`);

    } else {
        document.write(`<div>${element.name}: 
        Height: ${element.height} / 
        Types: ${element.types} </div>`);
    }
})