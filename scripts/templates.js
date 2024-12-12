/* Template to generate a dish content for the restaurant category */
function getAlbumCard(pokemon) {
    const typesList = pokemon.types
        .map(typeObj => `<img class="type"
                              style="background-color: var(--type-${typeObj.type.name}) "
                              src="./assets/icons/types/${typeObj.type.name}.png" 
                              alt="${capitalizeFirstLetter(typeObj.type.name)}" 
                              title="${capitalizeFirstLetter(typeObj.type.name)}">`)
        .join("");

    return `
        <div class="col">
            <div class="card rounded shadow-sm">
                <div class="position-relative card-img-top bg-body-tertiary d-flex justify-content-center align-items-center"
                     style="height: 215px; background-image: linear-gradient(180deg, var(--type-${pokemon.types[0].type.name}), var(--gradient-color2))">
                    <img class="img-fluid rounded-top card-img-hoover" 
                        style="height: 215px; width: 215px"
                        src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${formatValue(pokemon['id'], '000')}.png"
                        alt=""
                        data-bs-toggle="modal" data-bs-target="#pokemonModal"
                        onclick="showPokemonDetails(${pokemon['id']})">
                    <span class="position-absolute top-0 start-0 p-1">#${formatValue(pokemon['id'], '000')}</span>
                </div>

                <div class="card-body">
                    <h5 class="card-title">${capitalizeFirstLetter(pokemon['name'])}</h5>
                    <div class="d-flex justify-content-center align-items-center card-types">
                        ${typesList}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPokemonDetails(pokemon) {
    const typesList = pokemon.types
        .map(typeObj => `<img class="type"
                              style="background-color: var(--type-${typeObj.type.name}) "
                              src="./assets/icons/types/${typeObj.type.name}.png" 
                              alt="${capitalizeFirstLetter(typeObj.type.name)}" 
                              title="${capitalizeFirstLetter(typeObj.type.name)}">`)
        .join("");

    return `
        <div class="col">
            <div class="card rounded shadow-sm">
                <div class="position-relative card-img-top bg-body-tertiary d-flex justify-content-center align-items-center"
                     style="height: 215px; background-image: linear-gradient(180deg, var(--type-${pokemon.types[0].type.name}), var(--gradient-color2))">
                    <img class="img-fluid rounded-top" 
                        style="height: 215px; width: 215px"
                        src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${formatValue(pokemon['id'], '000')}.png"
                        alt="">
                    <span class="position-absolute top-0 start-0 p-1">#${formatValue(pokemon['id'], '000')}</span>
                    
                    <h5 class="card-title position-absolute top-0 end-0 p-1">${capitalizeFirstLetter(pokemon['name'])}</h5>
                </div>

                <div class="card-body">
                    <div class="d-flex justify-content-center align-items-center card-types">
                        ${typesList}
                    </div>

                    

                </div>
            </div>
        </div>
    `;
}