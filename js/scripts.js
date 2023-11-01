//The array of pokemon in IIFE with return function add & getAll
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //returns a list of all pokemon contained in array pokemonList
    function getPokemonList() {
        return pokemonList;
    }
    function getAll() {
        return pokemonList;
    }

    // allows to add new pokemon to the array if it meets the needed conditions
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please use only the keys: name & detailsurl');
        }
    }
    //display one single pokemon
    function addListItem(pokemon) {
        loadDetails(pokemon).then(function () {
            let pokemonAll = document.querySelector('.pokemon-list');
            let pokemonItem = document.createElement('div');
            pokemonItem.classList.add('button-div', 'col-6', 'col-md-3', 'col-sm-4', 'mb-3');

            let pokemonButton = document.createElement('button');
            pokemonButton.classList.add('button-class');
            pokemonButton.setAttribute('data-toggle', 'modal');
            pokemonButton.setAttribute('data-target', '#pokemonModal');
            let nameElement = document.createElement('div');
            nameElement.classList.add('div-name');
            nameElement.innerText = pokemon.name;

            let imageElement = document.createElement('img');
            imageElement.src = pokemon.imageUrl;
            imageElement.alt = ('A picture of ' + pokemon.name);
            pokemonButton.appendChild(nameElement);
            pokemonButton.appendChild(imageElement);
            pokemonItem.appendChild(pokemonButton);
            pokemonAll.appendChild(pokemonItem);
            //call the function on click for button
            addButtonEvent(pokemonButton, pokemon);
        })
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
            // console.log('resp',reponse);

            return response.json();

        }).then(function (details) {

            // Now we add the details to the item
            //spirites & front_default defined in the API itselfs, as url was 
            item.imageUrl = details.sprites.front_default;
            item.abilities = details.abilities;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            console.trace(e);
            hideLoadingMessage();
        });
    }

    // will show details of pokemon when function called through click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            displayModal(pokemon);
        });
    };

    function displayModal(pokemon) {
        let modalTitle = document.querySelector('.modal-title')
        let modalBody = document.querySelector('.modal-body')

        modalTitle.innerText = '';
        modalBody.innerText = '';
        modalTitle.innerText = pokemon.name;
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        console.log('img2', imageElement)
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let abilityElement = document.createElement('p');
        let abilitiesPokemon = pokemon.abilities.map(ability => ability.ability.name)
        abilityElement.innerText = 'Abilities: ' + abilitiesPokemon.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1));;

        let typeElement = document.createElement('p');
        let typePokemon = pokemon.types.map(type => type.type.name)
        typeElement.innerText = 'Types: ' + typePokemon.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1));;

        modalBody.appendChild(contentElement);
        modalBody.appendChild(typeElement);
        modalBody.appendChild(abilityElement);
        modalBody.appendChild(imageElement);
    }

    function displayLoadingMessage() {
        let messageElement = document.createElement('h2');
        messageElement.classList.add('load-message');
        messageElement.innerHTML = 'The List Is Loading...';
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
        getPokemonList,
        displayLoadingMessage
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data has loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });

});

function findPokemon() {
    var divsPokemon = document.querySelectorAll('.button-div');
    divsPokemon.forEach(function (div) {
        div.style.display = '';
    });

    var inputValue = document.querySelector('#searchInput').value.toUpperCase();
    var matchFound = false;
    //looks through all the text inside the divs for the match with the input
    for (let i = 0; i < divsPokemon.length; i++) {
        var divNameText = divsPokemon[i].querySelector('.div-name').innerText;
        if (divNameText.indexOf(inputValue) > -1) {
            divsPokemon[i].style.display = '';
            matchFound = true;
        } else {
            divsPokemon[i].style.display = 'none';
        }
    }
    //removes errorMessage
    var existingErrorMessage = document.querySelector('.no-pokemon-message');
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }
    //displays message when no match found
    if (!matchFound) {
        var main = document.querySelector('main');
        var noPokemon = document.createElement('h2');
        noPokemon.classList.add('no-pokemon-message');
        noPokemon.innerText = 'No Pokemon Matches The Search, Please Try Again. 😃';
        main.appendChild(noPokemon);
    }
    document.querySelector('#searchInput').value = '';
}

document.querySelector('#searchButton').addEventListener('click', findPokemon);
document.querySelector('#searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        findPokemon();
    }
});

//  async function findPokemon() {
//     await pokemonRepository.loadList();
//     let inputValue = document.querySelector('#searchInput').value.toLowerCase();

//     let founPokemon = pokemonRepository.getPokemonList().filter((pokemon)=> {
//         return pokemon.name.toLowerCase().includes(inputValue);
//     })
//     if (founPokemon) {
//         console.log('found', founPokemon);
//     } else {
//         console.log('nothing');
//     }
// }
