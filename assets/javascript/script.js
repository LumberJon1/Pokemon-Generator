//Selector variables

//array to hold types
var types = [];

//Get the array of different types from API
var getTypes = function() {
    apiURL = "https://pokeapi.co/api/v2/type/?limit=20";

    fetch(apiURL).then(function(response) {
        response.json().then(function(pokeTypes) {

            //Push each item to global types array
            for (var i = 0; i < pokeTypes.results.length; i++) {
                types.push(pokeTypes.results[i].name);
            }
        });
    });
}



randomizeButtonEl = document.querySelector("#randomize-button");

var generatePokemon= function(pokemon) {

    //Take the json object pokemon and get its name, typing, and sprite
    pokeName = pokemon.name;
    pokeSprite = pokemon.sprites.front_default; //the URL of a PNG file from the API
    pokeTypes = pokemon.types; //array of objects.  The type string is pokeTypes[i].type.name;

    //Declare necessary DOM element variables
    var pokemonSectionEl = $("#pokemon-section");
    var pokemonTitleEl = $("#pokemon-title");
    var pokemonDisplayEl = $("#pokemon-img-container");

    //Create DOM elements and create/append based on the object values
    pokemonTitleEl.text(pokeName)
        .addClass("text-warning font-weight-bold poke-name");

    //Remove any previous images from the DOM
    $("#pokemon-img-container").children("img").remove();

    //Add image from the URL for the current pokemon's sprite
    var sprite = $("<img>").attr("src", pokeSprite).addClass("poke-img");
    pokemonDisplayEl.append(sprite);

    //Clear any previous types listed

    //Display either one or two types for the pokemon
    var typeList = [];

    if (pokeTypes.length === 1) {
        //Only generate one type
        typeList.push(pokeTypes[0].type.name);
    }
    else {
        //generate two types
        for (var i = 0; i < pokeTypes.length; i++) {
            typeList.push(pokeTypes[i].type.name);
        }
    }

    //Create elements from the typeList
    var typesDiv = $("<div>").addClass("d-flex justify-content-center col-4 mx-auto mb-3 mt-1");

    for (var i = 0; i < typeList.length; i++) {
        typesDiv.append("<span>").text(typeList[i])
            .addClass("badge badge-pill badge-success");
    };

    console.log("typeList:", typeList);
    pokemonSectionEl.append(typesDiv);

    return;

};

var requestPokemon = function(number) {
    apiURL = "https://pokeapi.co/api/v2/pokemon/"+number+"?limit=100";

    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            generatePokemon(data);
        });
    });

}

getTypes();

randomizeButtonEl.addEventListener("click", function() {
    
    //Use a random number to pick a pokemon
    var randomPokeIndex = Math.floor(Math.random() * 1000);
    requestPokemon(randomPokeIndex);
});