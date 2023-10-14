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
            let keys = Object.keys(pokemon).map(function (toLower) {
                return toLower.toLowerCase();
            })

            let validKeys = keys.every(function (validk) {
                return Object.keys(pokemonList[0]).map(function (toLower) {
                    return toLower.toLowerCase();
                }).includes(validk);
            })

            if (validKeys) {
                return pokemonList.push(pokemon);
            }
            else {
                console.log('Error: Wrong keys. The keys are: name, height, types.');
            }
        } else {
            console.log('Please add an object as the pokemon.');
        }
    }
    //allows to find pokemon by name
    function filter(name) {
        if (typeof name === 'string' && name !== '') {
            let pokemonNames = pokemonList.map(function (pokemon) {
                return pokemon.name.toLowerCase();
            })
            let lowerCaseName = name.toLowerCase();
            nameInList = pokemonNames.includes(lowerCaseName);
            if (nameInList) {
                console.log('The pokemon: ' + name + ' is in the list! :D');
            } else {
                console.log('This pokemon doesn\'t exist in the list')
            }
        } else {
            console.log('Input must be a string.')
        }
    }
    //display one single pokemon
    function addListItem(pokemon) {
        let pokemonAll = document.querySelector('.pokemon-list');
        let pokemonItem = document.createElement('li');

        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('button-class');
        pokemonItem.appendChild(pokemonButton);
        pokemonAll.appendChild(pokemonItem);

        pokemonButton.addEventListener('click', function(){
            showDetails(pokemon.name);
        });
    }
    // will show details of pokemon when function called through click
    function showDetails(pokemon){
        console.log(pokemon);
    };


    return {
        getAll,
        add,
        filter,
        addListItem,
        showDetails
    };
})();


// pokemonRepository.add(vv); -> why i don’t get the error message i predefined?


// Loops through the function addListItem until completely trough the array
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    // if (element.height <= 70) {
    //     document.write(`<div>${element.name}: 
    //     Height: ${element.height} / 
    //     Types: ${element.types} - Tiny pokemon </div>`);

    // } else {
    //     document.write(`<div>${element.name}: 
    //     Height: ${element.height} / 
    //     Types: ${element.types} </div>`);
    // }
})