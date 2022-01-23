//Selector variables

//arrays to hold types and pokemon numbers

//onclick event for the button

//function...



randomizeButtonEl = document.querySelector("#randomize-button");

var generatePokemon= function(pokemon) {

    //Take the json object pokemon and get its name, typing, and sprite
    pokeName = pokemon.name;
    pokeSprite = pokemon.sprites.front_default; //the URL of a PNG file from the API
    pokeTypes = pokemon.types; //array of objects.  The type string is pokeTypes[i].type.name;

    //Create DOM elements based on these values
    return;

};

var requestPokemon = function(number) {
    console.log("Searching API for Pokemon number"+number);
    apiURL = "https://pokeapi.co/api/v2/pokemon/"+number+"?limit=100";

    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            generatePokemon(data);
        });
    });

}

randomizeButtonEl.addEventListener("click", function() {
    
    //Use a random number to pick a pokemon
    var randomPokeIndex = Math.floor(Math.random() * 1000);
    console.log(randomPokeIndex);
    requestPokemon(randomPokeIndex);
});