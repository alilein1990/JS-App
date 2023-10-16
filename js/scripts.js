//The array of pokemon in IIFE with return function add & getAll
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //returns a list of all pokemon contained in array pokemonList
    function getAll() {
        return pokemonList;
    }
    // allows to add new pokemon to the array if it meets the needed conditions
    function add(pokemon) {
        //makes sure the type is object
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Wrong naming for pokemon');
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
        //call the function on click for button
        addButtonEvent(pokemonButton, pokemon);
    }
    //add event on click for the button, 2 parameter
    function addButtonEvent(pokemonButton, pokemon) {
        pokemonButton.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    // will load only the name & url of the pokemon from the API
    function loadList() {
        displayLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }
    // load only image, height, type per pokemon, not the other details from the API
    function loadDetails(item) {
        //deatilsUrl comes from loadList() - is the item.url
        displayLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            //spirites & front_default defined in the API itselfs, as url was 
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    // will show details of pokemon when function called through click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    };
    // TO DO code filter funtion
    function searchPokemonByName(name) {
        name = name.toLowerCase();

        let foundPokemon = pokemonList.find(function (pokemon) {
            return pokemon.name.toLowerCase() === name;
        });

        if (foundPokemon) {
            console.log('Found:', foundPokemon);
        } else {
            console.log('Pokemon not found');
        }
    }

    function displayLoadingMessage() {
        let messageElement = document.createElement('div');
        messageElement.classList.add('load-message');
        messageElement.innerHTML = 'The pokemon are loading...';
        document.body.appendChild(messageElement);
        return messageElement;
    }

    function hideLoadingMessage() {
        let messageElement = document.querySelector('.load-message');
        document.body.removeChild(messageElement);
    }
    return {
        getAll,
        add,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
        searchPokemonByName
    };
})();


// pokemonRepository.add({name:'Test', detailsUrl:'https://pokeapi.co/api/v2/pokemon/1/'})
// pokemonRepository.searchPokemonByName('bulbasaur');    ---> doesnt work :(
//console.log(pokemonRepository.getAll());   ---> doesnt work :(

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
