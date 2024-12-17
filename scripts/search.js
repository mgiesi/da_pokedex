let albumFilterActive = false;

function initSearchEngine() {
    const searchRef = document.getElementById("album-search");
    searchRef.addEventListener("input", searchPokemon);
    searchRef.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    })
}

function searchPokemon() {
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

        if (albumFilterActive) {
            resetAlbumFilter();
        }
        albumFilterActive = false;
    } else {
        albumFilterActive = true;

        errorHint.style.display = "none";
        searchRef.classList.remove("is-invalid");

        setAlbumFilter();
    }
}