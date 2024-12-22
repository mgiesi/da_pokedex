/** Base URL needed for the pokemon API */
const BASE_URL = "https://pokeapi.co/api/v2/";
/** Number of pokemon cards to load at once */
const LIMIT = 20;

/** Configuration object for the album. Contains filter settings and list of loaded pokemon-ids */
let albumConfig = {
    "maxResults": 0,
    "offset": 0,
    "filter": null,
    "ids": [],

    filterActive() {
        return this.filter !== undefined &&
            this.filter !== null &&
            this.filter.length > 2;
    }
};

/** Function to update filter-settings. Reads the filter-text from the UI element and loads the album. */
function setAlbumFilter() {
    const searchRef = document.getElementById("album-search");
    albumConfig.filter = searchRef.value;
    setAlbumFooterVisible(false);
    loadAlbum();
}

function resetAlbumContent(resetFilter) {
    const albumContentRef = document.getElementById("album-container");
    albumContentRef.innerHTML = "";
    albumConfig.offset = 0;
    if (resetFilter) {
        albumConfig.filter = "";
    }
}

function resetAlbumFilter() {
    resetAlbumContent(true);
    setAlbumFooterVisible(true);
    loadAlbum();
}

function setAlbumFooterVisible(visible) {
    const cardCountRef = document.getElementById("album-elements-count");
    const loadNextRef = document.getElementById("album-load-elements");

    if (visible) {
        cardCountRef.classList.remove("hidden");
        loadNextRef.classList.remove("hidden");
    } else {
        cardCountRef.classList.add("hidden");
        loadNextRef.classList.add("hidden");
    }
}

/** Global function to refresh the album. */
async function loadAlbum() {
    setSpinnerVisible(true);
    if (albumConfig.filterActive()) {
        await loadAlbumFiltered();
    } else {
        await loadAlbumFull();
    }

    renderCounter();
    setSpinnerVisible(false);
}

/** Internal function to load the full album ignoring any filter settings. */
async function loadAlbumFull() {
    let pokemonList = await requestPokemonList(LIMIT);
    albumConfig.maxResults = pokemonList.count;
    for (const pokemonObj of pokemonList.results) {
        addPokemonCard(pokemonObj);
    }

    albumConfig.offset += LIMIT;
}

/** Internal function to load filtered list of album */
async function loadAlbumFiltered() {
    resetAlbumContent(false);

    let pokemonList = await requestPokemonList(10000);
    albumConfig.maxResults = pokemonList.count;
    for (const pokemonObj of pokemonList.results) {
        if (pokemonObj.name.includes(albumConfig.filter)) {
            addPokemonCard(pokemonObj);
        }
    }
}

async function addPokemonCard(pokemonObj) {
    const albumContentRef = document.getElementById("album-container");
    let pokemon = await requestPokemonData(pokemonObj.url);
    albumContentRef.innerHTML += getAlbumCard(pokemon);
    albumConfig.ids.push(pokemon.id);
}

function setSpinnerVisible(visible) {
    const spinnerRef = document.getElementById("spinner-album");
    if (visible) {
        spinnerRef.classList.remove("hidden");
    } else {
        spinnerRef.classList.add("hidden");
    }
}

function renderCounter() {
    const counterTextRef = document.getElementById("album-elements-count");
    counterTextRef.innerHTML = albumConfig.offset + " of " + albumConfig.maxResults + " Pokémon";
}

async function requestPokemonList(limit) {
    let response = await fetch(BASE_URL + "pokemon?limit=" + limit + "&offset=" + albumConfig.offset);
    return responseToJson = await response.json();
}

async function requestPokemonData(url) {
    let response = await fetch(url);
    return responseToJson = await response.json();
}
