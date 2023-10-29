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
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please use only the keys: name & detailsurl');
        }
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

        //display one single pokemon
        function addListItem(pokemon) {
            loadDetails(pokemon).then (function(){
            let pokemonAll = document.querySelector('.pokemon-list');
            let pokemonItem = document.createElement('div');
            pokemonItem.classList.add('col-6','col-md-3', 'col-sm-4','mb-3', );
    
            let pokemonButton = document.createElement('button');
            pokemonButton.innerText = pokemon.name;
            pokemonButton.classList.add('button-class');
            pokemonButton.setAttribute('data-toggle', 'modal');
            pokemonButton.setAttribute('data-target', '#pokemonModal');
  
            let imageElement = document.createElement('img');
            imageElement.src = pokemon.imageUrl;
            imageElement.alt = 'Pokemon image';
            
            pokemonButton.appendChild(imageElement);
            pokemonItem.appendChild(pokemonButton);
            pokemonAll.appendChild(pokemonItem);
            //call the function on click for button
            addButtonEvent(pokemonButton, pokemon);
            })
        }
    
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
        contentElement.innerText = ('Height: ' + pokemon.height);

        // let abilityElement = document.createElement('p');

        // let abilitiesPokemon = pokemon.abilities.map(ability => ability.ability.name)
        // console.log('abilit', abilitiesPokemon)
        // abilityElement.innerText = ('Ability: ' + abilitiesPokemon);

        modalBody.appendChild(contentElement);
        // modalBody.appendChild(abilityElement);
        modalBody.appendChild(imageElement);
    }

    // TO DO code find funtion
    function findPokemon(name) {
        name = name.toLowerCase();

        let foundPokemon = pokemonList.filter(
            (pokemonItem) => pokemonItem.name === name

        );
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
        findPokemon
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data has loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);

    });
    // pokemonRepository.findPokemon(name).addEventListener('keyup',);
});
