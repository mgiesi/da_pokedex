const barMax = [
    { "name": "hp", "max": 255 },
    { "name": "attack", "max": 190 },
    { "name": "defense", "max": 230 },
    { "name": "special_attack", "max": 194 },
    { "name": "special_defense", "max": 230 },
    { "name": "speed", "max": 180 }
];

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

function getPokemonDetails(pokemon, pokemonEvolution) {
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

                <div class="card-body px-0 mx--1">
                    <div class="d-flex justify-content-center align-items-center card-types">
                        ${typesList}
                    </div>

                    <div>
                        ${getPokemonDetailsNav(pokemon)}
                    </div>

                    <div>
                        ${getPokemonDetailsNavContent(pokemon, pokemonEvolution)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPokemonDetailsNav(pokemon) {
    return `
        <ul class="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="ex1-tab-1" 
                data-bs-toggle="tab" data-bs-target="#ex1-tabs-1" 
                type="button" role="tab" aria-controls="ex1-tabs-1" aria-selected="true">
                General
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="ex1-tab-2" 
                data-bs-toggle="tab" data-bs-target="#ex1-tabs-2" 
                type="button" role="tab" aria-controls="ex1-tabs-2" aria-selected="false">
                Stats
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="ex1-tab-3" 
                data-bs-toggle="tab" data-bs-target="#ex1-tabs-3" 
                type="button" role="tab" aria-controls="ex1-tabs-3" aria-selected="false">
                Evolution
                </button>
            </li>
        </ul>
    `;
}

function getPokemonDetailsNavContent(pokemon, pokemonEvolution) {
    return `
        <div class="tab-content" id="ex1-content">
            <div 
                class="tab-pane fade show active" id="ex1-tabs-1" 
                role="tabpanel" aria-labelledby="ex1-tab-1">
                ${getPokemonDetailsGeneral(pokemon)}
            </div>
            <div 
                class="tab-pane fade" id="ex1-tabs-2" 
                role="tabpanel" aria-labelledby="ex1-tab-2">
                ${getPokemonDetailsStats(pokemon)}
            </div>
            <div 
                class="tab-pane fade" id="ex1-tabs-3" 
                role="tabpanel" aria-labelledby="ex1-tab-3">
                ${getPokemonDetailsEvolution(pokemon, pokemonEvolution)}
            </div>
        <div>
    `;
}

function getPokemonDetailsGeneral(pokemon) {
    const abilitiesList = pokemon.abilities
        .map(abilityObj => `${capitalizeFirstLetter(abilityObj.ability.name)}`)
        .join(", ");

    return `
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img class="card-img-general m-2" src="./assets/icons/height.png">
                    <span class="m-2">${pokemon['height'] / 10} m</span>
                </div>
                <div class="d-flex align-items-center">
                    <img class="card-img-general m-2" src="./assets/icons/experience.png">
                    <span class="m-2">${pokemon['base_experience']}</span>
                </div>
            </div>
            <div class="col-6">
                <img class="card-img-general m-2" src="./assets/icons/weight.png">
                <span class="m-2">${pokemon['weight'] / 10} kg</span>
            </div>
            <div class="col-6">
                <img class="card-img-general m-2" src="./assets/icons/abilities.png">
                <span class="m-2">${abilitiesList}</span>
            </div>
        </div >
        `;
}

function getPokemonDetailsStats(pokemon) {
    let statsList = "";
    for (let i = 0; i < pokemon.stats.length; i++) {
        const maxStat = barMax.find(stat => stat.name === pokemon.stats[i].stat.name)?.max || 100;
        const progressHeight = (pokemon.stats[i].base_stat / maxStat) * 100;
        statsList += `
            <div class="col d-flex flex-column justify-content-center align-items-center">
                <div class="progress" style="height: 150px; width: 20px; transform: scaleY(-1)">
                    <div class="progress-bar" 
                         role="progressbar" 
                         style="height: ${progressHeight}%; width: 100%; " aria-valuenow="${pokemon.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span class="small text-center" style="height: 50px">${pokemon.stats[i].stat.name}</span >
            </div >
            `;
    }

    return `
            <div class="container-fluid">
                <div class="row">
                    ${statsList}
                </div>
            </div >
            `;
}

function getPokemonDetailsEvolution(pokemon, pokemonEvolution) {
    let currentEvolution = pokemonEvolution.chain;
    let evolutionEntries = "";
    while (currentEvolution) {
        if (evolutionEntries.length > 0) {
            evolutionEntries += `
                <img class="img-fluid" 
                    style="height: 32px; width: 32px"
                    src="./assets/icons/next.png"
                    alt="">
            `;
        }
        let number = currentEvolution.species.url.match(/\/(\d+)\/$/)?.[1];
        evolutionEntries += `
            <div class="d-flex flex-column">
                <img 
                    onclick="showPokemonDetails(${number})"
                    class="img-fluid cp" 
                    style="height: 96px; width: 96px"
                    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${formatValue(number, '000')}.png"
                    alt="">
                <span class="text-center">${capitalizeFirstLetter(currentEvolution.species.name)}</span>
            </div>
        `;

        currentEvolution = currentEvolution.evolves_to[0];
    }

    return `
        <div class="container-fluid">
            <div class="row">
                <div class="d-flex justify-content-between align-items-center">
                    ${evolutionEntries}
                </div>
            </div>
        </div >
    `;
}