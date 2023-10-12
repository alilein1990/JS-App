//The array of pokemon in IIFE with return function add & getAll
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 70, types: ['grass', ' poison'] },
        { name: 'Butterfree', height: 110, types: ['bug', ' flying'] },
        { name: 'Ariados', height: 110, types: ['bug', ' poison'] },
        { name: 'Slowbro', height: 160, types: ['psychic', ' water'] }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object') {

            let keys = Object.keys(pokemon).map(function(toLower){
                return toLower.toLowerCase();
            })

            let validKeys = keys.every(function(validk){
                return Object.keys(pokemonList[0]).map(function(toLower){
                    return toLower.toLowerCase();
                }).includes(validk);
            })
            
            if(validKeys){
                return pokemonList.push(pokemon);
            }
            else{
                document.write('Error: Wrong keys. The keys are: name, height, types.');
            }
        } else {
            document.write('Please add an object as the pokemon');
        }
    }

    function filter(){

    }
    return {
        getAll,
        add,
        filter
    };
})();

// Loops through the array of pokemon and points out which ones height is <= 70
pokemonRepository.getAll().forEach(function (element) {
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