/** Global variable to check, if a filter is currently active or not */
let albumFilterActive = false;

/** We have to block the enter key to prevent a reload of the page */
function initSearchEngine() {
    const searchRef = document.getElementById("album-search");
    searchRef.addEventListener("input", searchPokemon);
    searchRef.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    })
}

/** Will always be called on an input event of the search field. */
function searchPokemon() {
    const searchRef = document.getElementById("album-search");
    if (searchRef.value === null ||
        searchRef.value.length < 3) {
        if (albumFilterActive) {
            resetAlbumFilter();
        }
        albumFilterActive = false;
    } else {
        albumFilterActive = true;

        setAlbumFilter();
    }

    updateSearchUI();
}

/** Refresh of the UI elements for the search */
function updateSearchUI() {
    const searchRef = document.getElementById("album-search");
    const errorHint = document.getElementById("errorHint");
    if (searchRef.value === null ||
        searchRef.value.length < 3) {

        if (searchRef.value.length <= 0) {
            errorHint.style.display = "none";
            searchRef.classList.remove("is-invalid");
        } else {
            errorHint.style.display = "block";
            searchRef.classList.add("is-invalid");
        }
    } else {
        errorHint.style.display = "none";
        searchRef.classList.remove("is-invalid");
    }
}