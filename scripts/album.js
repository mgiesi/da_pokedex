const BASE_URL = "https://pokeapi.co/api/v2/";

const LIMIT = 10;

let maxResults = 0;
let offset = 0;
let filter;

function setAlbumFilter() {
    const searchRef = document.getElementById("album-search");
    filter = searchRef.value;

    loadAlbum();
}

async function loadAlbum() {
    if (filter !== undefined &&
        filter !== null &&
        filter.length > 2) {
        await loadAlbumFiltered();
    } else {
        await loadAlbumFull();
    }

    renderCounter();
}

async function loadAlbumFull() {
    const albumContentRef = document.getElementById("album-container");
    let pokemonList = await requestPokemonList(LIMIT);
    maxResults = pokemonList.count;
    for (const pokemonObj of pokemonList.results) {
        let pokemon = await requestPokemon(pokemonObj.url);
        albumContentRef.innerHTML += getAlbumCard(pokemon);
    }

    offset += LIMIT;
}

async function loadAlbumFiltered() {
    const albumContentRef = document.getElementById("album-container");
    albumContentRef.innerHTML = "";
    offset = 0;

    let pokemonList = await requestPokemonList(10000);
    maxResults = pokemonList.count;
    for (const pokemonObj of pokemonList.results) {
        if (pokemonObj.name.includes(filter) === false) {
            continue;
        }

        let pokemon = await requestPokemon(pokemonObj.url);
        albumContentRef.innerHTML += getAlbumCard(pokemon);
    }
}

function renderCounter() {
    const counterTextRef = document.getElementById("album-elements-count");
    counterTextRef.innerHTML = offset + " of " + maxResults + " Pokémon";
}

async function showPokemonDetails(id) {
    let pokemon = await requestPokemon(BASE_URL + "/pokemon/" + id);

    const modalContent = document.getElementById("album-modal-content");
    modalContent.innerHTML = getPokemonDetails(pokemon);
}

async function requestPokemonList(limit) {
    let response = await fetch(BASE_URL + "pokemon?limit=" + limit + "&offset=" + offset);
    return responseToJson = await response.json();
}

async function requestPokemon(url) {
    let response = await fetch(url);
    return responseToJson = await response.json();
}