//The array of pokemon in IIFE with return function add & getAll
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('.modal-container');
    //returns a list of all pokemon contained in array pokemonList
    function getAll() {
        return pokemonList;
    }
    // allows to add new pokemon to the array if it meets the needed conditions
    // why udidentified when NAme:
    function add(pokemon) {

        if (
            typeof pokemon === 'object' &&
            Object.keys(pokemon).some(function (key) { return key.toLowerCase() === 'name' }) &&
            Object.keys(pokemon).some(key => key.toLowerCase() === 'detailsurl')
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please use only the keys: name & detailsUrl');
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
            modalContainer.classList.add('is-visible')
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
            displayModal(pokemon);
        });
    };

    function displayModal(pokemon) {
        modalContainer.innerText = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modal.appendChild(closeButtonElement);

        modalContainer.appendChild(modal);

        modalContainer.addEventListener('click', (e)=>{
            let target = e.target;
          //make sure only activated when clicked on modalContainer,so when users klicks on the modal itself it will not close 
            if(target === modalContainer){
              hideModal();
            }
          });
    }
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) =>{
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });
    
    // TO DO code filter funtion
    function findPokemon(name) {
        // console.log('Input name:', name);
        name = name.toLowerCase();

        let foundPokemon = pokemonList.find(function (pokemon) {
            console.log('Current pokemon name:', pokemon.name);
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
        findPokemon
    };
})();



pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


//undefined???
pokemonRepositorykemonRepository.add({ Name: 'PEp', detailsUrl: 'https://pokeapi.co/api/v2/pokemon/1/' }); 
//setTimeout(pokemonRepository.findPokemon('venusaur'),5000);