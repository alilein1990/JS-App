// Immediately-Invoked Function Expression / IIFE returns some functions from inside it
let pokemonRepository = (function () {

    // list gets filled by loadlist & add functions
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


    // allows to add new pokemon to the array if it meets the needed conditions
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please use only the keys: name & detailsUrl');
        }
    }

    // displays one single pokemon
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
            // call the function on click for button
            addButtonEvent(pokemonButton, pokemon);
        })
    }

    // add event on click for the pokemon button / modal
    function addButtonEvent(pokemonButton, pokemon) {
        pokemonButton.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    // will load only the name & url of the pokemon from the API
    function loadList(start = 0, limit = 150) {
        clearList();
        displayLoadingMessage();
        // offset: from what pokemon number the pokemon should be shown 
        // limit : how many pokemon that follow from offset number
        let urlList = `${apiUrl}?offset=${start}&limit=${limit}`;

        return fetch(urlList).then(function (response) {
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

    // load the  details  image, height, abilities, type of the pokemon from the API
    function loadDetails(item) {
        //detailsUrl comes from loadList() - is the item.url
        displayLoadingMessage();
        let url = item.detailsUrl;

        return fetch(url).then(function (response) {
            // console.log('resp',reponse);
            return response.json();

        }).then(function (details) {
            // Now we add the details to the item
            // spirites & front_default defined in the API itselfs, as url was 
            item.imageUrl = details.sprites.front_default;
            item.modalImageUrl = details.sprites.other['official-artwork'].front_default;
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
    }
    // displays the modal with info about the requested pokemon
    function displayModal(pokemon) {
        let modalTitle = document.querySelector('.modal-title')
        let modalBody = document.querySelector('.modal-body')

        modalTitle.innerText = '';
        modalBody.innerText = '';
        modalTitle.innerText = pokemon.name;
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.modalImageUrl;
        console.log('img2', imageElement)
        let contentElement = document.createElement('p');
        contentElement.innerHTML = '<strong>Height:</strong> ' + pokemon.height;

        let abilityElement = document.createElement('p');
        let abilitiesPokemon = pokemon.abilities.map(ability => ability.ability.name)
        abilityElement.innerHTML = '<strong>Abilities:</strong> ' + abilitiesPokemon.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1)).join(', ');

        let typeElement = document.createElement('p');
        let typePokemon = pokemon.types.map(type => type.type.name)
        typeElement.innerHTML = '<strong>Type:</strong> ' + typePokemon.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1)).join(', ');

        modalBody.appendChild(contentElement);
        modalBody.appendChild(typeElement);
        modalBody.appendChild(abilityElement);
        modalBody.appendChild(imageElement);
    }

    // shows  a message when pokemon from API are loading
    function displayLoadingMessage() {
        let spinner = document.querySelector('.spinner-border')
        spinner.classList.remove('hide');
    }

    // removes the loading message when all pokemon been loaded
    function hideLoadingMessage() {
        let spinner = document.querySelector('.spinner-border')
        spinner.classList.add('hide');
    }

    // allows to search for pokemon by name
    function findPokemon() {
        let divsPokemon = document.querySelectorAll('.button-div');
        divsPokemon.forEach(function (div) {
            div.style.display = '';
        });

        let inputValue = document.querySelector('#searchInput').value.toUpperCase();
        let matchFound = false;
        // looks through all the text inside the divs for the match with the input
        for (let i = 0; i < divsPokemon.length; i++) {
            let divNameText = divsPokemon[i].querySelector('.div-name').innerText;
            if (divNameText.indexOf(inputValue) > -1) {
                divsPokemon[i].style.display = '';
                matchFound = true;
            } else {
                divsPokemon[i].style.display = 'none';
            }
        }
        // removes errorMessage
        let existingErrorMessage = document.querySelector('.no-pokemon-message');
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }
        // displays message when no match found
        if (!matchFound) {
            let main = document.querySelector('main');
            let noPokemon = document.createElement('h2');
            noPokemon.classList.add('no-pokemon-message');
            noPokemon.innerHTML = 'No Pokemon Matches the Search. <br> Please Try Again. 😃';
            main.appendChild(noPokemon);
        }
        document.querySelector('#searchInput').value = '';
    }

    return {
        getAllPokemon,
        add,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
        displayLoadingMessage,
        findPokemon,

    };
})();

// loads list of 150 pokemon when app just opened
pokemonRepository.loadList().then(function () {
    // after loadList, data has loaded that further actions can be applied
    pokemonRepository.getAllPokemon().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });

});


const generations = [
    // { id: '#gen-one', start: 0, limit: 151 },
    { id: '#gen-one', start: 0, limit: 51 },
    { id: '#gen-two', start: 151, limit: 100 },
    { id: '#gen-three', start: 251, limit: 135 },
    { id: '#gen-four', start: 386, limit: 107 },
    { id: '#gen-five', start: 493, limit: 156 },
    { id: '#gen-all', start: 0, limit: 650 },
];

generations.forEach(gen => {
    document.querySelector(gen.id).addEventListener('click', function () {
        pokemonRepository.loadList(gen.start, gen.limit).then(function () {

            pokemonRepository.getAllPokemon().forEach(pokemonRepository.addListItem);
        });
    });
});

// activates findPokemon function on click
document.querySelector('#searchButton').addEventListener('click', pokemonRepository.findPokemon);

// activates findPokemon function on button Enter
document.querySelector('#searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        pokemonRepository.findPokemon();
    }
});

