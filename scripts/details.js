/** Refresh of the dialog content to display details for a single pokemon. */
async function showPokemonDetails(id) {
    const modalContent = document.getElementById("album-modal-content");
    modalContent.innerHTML = getSpinnerDetails();

    let pokemon = await requestPokemonData(BASE_URL + "/pokemon/" + id);
    let pokomonSpecies = await requestPokemonData(pokemon.species.url);
    let pokemonEvolution = await requestPokemonData(pokomonSpecies.evolution_chain.url);
    modalContent.innerHTML = getPokemonDetails(pokemon, pokemonEvolution);

    updatePrevNextUI(pokemon['id']);
}

/** Loads the previous available pokemon */
async function loadPrev(pokemonId) {
    let idx = albumConfig.ids.indexOf(pokemonId);
    if (idx > 0) {
        showPokemonDetails(albumConfig.ids[idx - 1]);
        updatePrevNextUI(albumConfig.ids[idx - 1])
    }
}

/** Loads the next available pokemon */
async function loadNext(pokemonId) {
    let idx = albumConfig.ids.indexOf(pokemonId);
    if (idx < albumConfig.ids.length - 1) {
        showPokemonDetails(albumConfig.ids[idx + 1]);
        updatePrevNextUI(albumConfig.ids[idx - 1])
    }
}

/** Sets the visibility for the next/prev buttons in the details dialog. */
function updatePrevNextUI(pokemonId) {
    const loadPrevRef = document.getElementById("card-load-prev");
    const loadNextRef = document.getElementById("card-load-next");
    let idx = albumConfig.ids.indexOf(pokemonId);
    if (idx < albumConfig.ids.length - 1) {
        loadNextRef.classList.remove("hidden");
    } else {
        loadNextRef.classList.add("hidden");
    }
    if (idx > 0) {
        loadPrevRef.classList.remove("hidden");
    } else {
        loadPrevRef.classList.add("hidden");
    }
}