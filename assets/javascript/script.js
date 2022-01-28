//Selector variables
randomizeButtonEl = document.querySelector("#randomize-button");

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

//Add classes to spans to color them appropriately
var colorType = function(element) {

    //Get the text content from the element
    var elementText = $(element).text();
    console.log("text content: ", elementText);

    //Manipulate the string to add ".type-" to the textContent's value and assign to a new var
    replacementText = "type-"+elementText;
    console.log("replacement text: ", replacementText);

    //Add that specific class to the element
    $(element).addClass(replacementText);


};


var generatePokemon= function(pokemon) {

    //Take the json object pokemon and get its name, typing, and sprite
    pokeName = pokemon.name;
    pokeSprite = pokemon.sprites.front_default; //the URL of a PNG file from the API
    pokeTypes = pokemon.types; //array of objects.  The type string is pokeTypes[i].type.name;

    //Get the number and name of types the pokemon originally had
    var typeNumber = 1;
    var originTypeList = [];

    for (var i = 0; i < pokeTypes.length; i++) {
        originTypeList.push(pokeTypes[i].type.name);
        typeNumber = i + 1;
    }

    //Assign a number of new types to the pokemon equal to typeNumber from the global types[] array
    for (var i = 0; i < typeNumber; i++) {
        var newTypeIndex = Math.floor(Math.random() * 20);
        
        if (originTypeList[i] != types[newTypeIndex]) {
            originTypeList[i] = types[newTypeIndex];
        }
        else {
            i--;
        }
    };

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

    //Append one or both types to the DOM...
    //1. If the element already exists, replace content with the new values.
    if ($("#badge-div").children(".type-badge").text() != "") {
        console.log("Type span(s) already exist.  Modifying content...");

        //Remove previous spans entirely from the DOM
        $("#badge-div").children("span").remove();

        //For each type in the new generated typing, append a new span and add text/classes
        for (var i = 0; i < typeNumber; i++) {
            var badgeSpan = $("<span>").addClass("badge type-badge mx-1");
            $("#badge-div").append(badgeSpan);
        }

        $(".type-badge").each(function(index) {
            $(this).text(originTypeList[index]);
            colorType(this);
        })
    }
    //2. IF it doesn't exist, create new elements and append to document. 
    else {
        
        badgeDiv = $("<div>").addClass("col-12 d-flex justify-content-center align-items-center")
            .attr("id", "badge-div");

        pokemonSectionEl.append(badgeDiv);

        for (var i = 0; i < typeNumber; i++) {
            var currentType = $("<span>")
                .addClass("badge type-badge mx-1")
                .text(originTypeList[i]);

            $("#badge-div").append(currentType);
            colorType(currentType);
        };
    };

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