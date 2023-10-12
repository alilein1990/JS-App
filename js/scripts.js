//The array of pokemon in IIFE with return function add & getAll
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 70, types: ['grass', ' poison'] },
        { name: 'Butterfree', height: 110, types: ['bug', ' flying'] },
        { name: 'Ariados', height: 110, types: ['bug', ' poison'] },
        { name: 'Slowbro', height: 160, types: ['psychic', ' water'] }
    ];
    //returns a list of all pokemon
    function getAll() {
        return pokemonList;
    }
    // allows to add new pokemon to the array if it meets the needed conditions
    function add(pokemon) {
        //makes sure the type is object
        if (typeof pokemon === 'object') {

            // makes sures keys from pokemon match the keys from pokemonList 
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
                console.log('Error: Wrong keys. The keys are: name, height, types.');
            }
        } else {
            console.log('Please add an object as the pokemon.');
        }
    }
    //allows to find pokemon by name
    function filter(name){
        if(typeof name === 'string' && name !== ''){
        let pokemonNames = pokemonList.map(function (pokemon){
            return pokemon.name.toLowerCase();
        }) 
        let lowerCaseName = name.toLowerCase();
        nameInList = pokemonNames.includes(lowerCaseName);
        if(nameInList){
                console.log('The pokemon: ' + name + ' is in the list! :D');
        }else{
            console.log('This pokemon doesn\'t exist in the list')
        }}else{
            console.log('Input must be a string.')
        }
    }

    return {
        getAll,
        add,
        filter
    };
})();


// pokemonRepository.add(vv); -> why i don’t get the error message i predefined?


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