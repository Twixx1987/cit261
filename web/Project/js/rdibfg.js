/******************************************************************
* A function to load the rdi file to local storage
******************************************************************/
function loadRdibfgLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        let rdibfgObj = JSON.parse(xhttp.responseText);

        // create a counter to use as the key for session storage
        let count = 1;

        // loop through the object adding properties to session storage
        for (let version in rdibfgObj.versions) {
            // loop through the characters adding them to session storage
            for (let character in rdibfgObj.versions[version].characters) {
                // get the character image string for the key
                let key = "Rdi_Bfg_Character_" + (count < 10 ? "0" + count : count);

                // get the character object and append the version and key to its members
                let characterObj = rdibfgObj.versions[version].characters[character];
                characterObj.version = rdibfgObj.versions[version].version;

                // stringify the character objectto store it in session storage
                let value = JSON.stringify(characterObj);

                // append the character to session storage
                sessionStorage.setItem(key, value);

                // increment count
                count++;
            }
        }
        // return that it succeeded
        return true;
    } else {
        // create an error string to display
        let error = "<h3>Your browser does not support web storage,"
                  + " this page requires session storage support to work properly.</h3>";

        // Notify the user that session storage is not supported
        document.getElementById("charactersList").innerHTML = error;

        // return that it failed
        return false;
    }
}


/******************************************************************
* A function to load the rdi data to the page
******************************************************************/
function loadRdibfg(xhttp) {
    // call load session to load the JSON file
    let success = loadRdibfgLocal(xhttp);

    // create a string variable to store the display contents
    let txt = "";

    // check to see that loadLocal executed
    if (success) {
        // check to see if session storage exists
        if (sessionStorage.getItem("Rdi_Bfg_Character_01") === null) {
            // display an error message indicating no session storage
            txt = "<h3>Error: Local storage failed to load properly.</h3>";

        } else {
            // get the length of the sessionStorage object
            let lslen = sessionStorage.length;

            // loop through the session storage keys displaying each one
            for (let count = 0; count < lslen; count++) {
                // create the option element
                let key = sessionStorage.key(count);

                // check to see if the session storage item is a pandemic role
                if (key.search("Rdi_Bfg_Character_") != -1) {
                    // get the value object
                    let value = JSON.parse(sessionStorage.getItem(key));

                    // display the version
                    txt += displayRdibfgImage(key, value);
                }
            }
        }
        // display the data from the session storage in a nice format
        document.getElementById("charactersList").innerHTML = txt;
    }
}

/******************************************************************
* A function to genearte the code for an image
******************************************************************/
function displayRdibfgImage(id, obj) {
    // create local storage for the character selection
    if (!localStorage.rdibfgCharacters) {
        localStorage.rdibfgCharacters = [];
    }

    // Create the image tag
    let txt = "<div id='" + id + "' class='card transition-all element-3d "
       + (localStorage.rdibfgCharacters.indexOf(id) != -1 ? " checked" : "unchecked")
       + "' onclick='rdibfgCharacterDetails(this)'>"
       + "<div class='face front'><img src='../images/RDI/" + obj.image + "'"
       + " alt='" + obj.name + "'"
       + " class='thumbnail' id='" + id + "'/></div>"
       + "<div class='face back'><img src='../images/BFG/BfgBack.jpg'"
       + " alt='Card Back'"
       + " class='thumbnail' id='" + id + "'/></div>"
       + "<div class='face right'></div>"
       + "<div class='face left'></div>"
       + "<div class='face top'></div>"
       + "<div class='face bottom'></div>"
       + "</div>";

    // return the content
    return txt;
}

/******************************************************************
* A function to display the character details
******************************************************************/
function rdibfgCharacterDetails(element) {
    // get the id of the element
    let id = element.getAttribute("id");

    // create an array to store the characters
    let characters = [];

    // get the characters from loacl storage
    if (localStorage.rdibfgCharacters != "")
        characters = JSON.parse(localStorage.rdibfgCharacters);

    // check to see if the character is in storage
    if (characters.indexOf(id) != -1) {
        // remove the character from local storage
        characters.splice(characters.indexOf(id), 1);
    } else {
        // add the character to the local stoarge list
        characters.push(id);
    }
    // put the new characters list into local storage
    localStorage.rdibfgCharacters = JSON.stringify(characters);

    // get the detail div
    let detail = document.getElementById("details");

    // get the current detail content
    let currentDetail = detail.firstChild;

    // toggle the classes for the selected card
    element.classList.toggle("checked");
    element.classList.toggle("unchecked");

    // load the sessionStorage object
    let obj = JSON.parse(sessionStorage.getItem(id));

    // create an element to display the new character details
    let newDetail = document.createElement("div");
    let content = "<h4>" + obj.name + "</h4><table>"
        + "<tr><th>Level</th><th>Damage</th><th>Abilities</th></tr>";

    // loop through the levels adding the level details to the details html
    for (let level in obj.levels) {
        content += "<tr><td><b>" + obj.levels[level].level + "</b></td>";
        content += "<td>" + obj.levels[level].damage + "</td>";
        content += "<td>" + obj.levels[level].abilities + "</td></tr>";
    }

    // close the table
    content += "</table>";

    // apply the content to the inner html of the new details div
    newDetail.innerHTML = content;

    // set the fade and move variables
    let timer = 0;

    // fade the current details div if it exists
    if (currentDetail) {
        // fade the current details div 
        currentDetail.classList.toggle("transparent");

        // use the interval function to create an animation
        let interval = setInterval(frame, 5);

        // rotation transform the element
        function frame() {
            // if the element has faded completly
            if (timer == 200) {
                // stop the animation
                clearInterval(interval);

                // remove the current details div if it exists
                if (currentDetail) {
                    // remove the current details div 
                    detail.removeChild(currentDetail);
                }

                // insert the details element into the characters list element
                detail.appendChild(newDetail);
            } else {
                // decrement the fade variable
                timer++;
            }
        }
    }
        // just fade in the new detail
    else {
        // insert the details element into the characters list element
        detail.appendChild(newDetail);
    }

}

/******************************************************************
* A function to generate the character selection
******************************************************************/
function generateRdibfg() {
    // initialize the variables
    let playerCount, i, randomizationElement, error, j, random, txt, characterName;
    let players, playerNames = [], characters = [];

    // get the player count
    playerCount = document.getElementById("numPlayers").value;

    // get the player class elements
    players = document.getElementsByClassName("players");

    //loop through the players elements getting the values for the player names array
    for (i = 0; i < players.length; i++) {
        playerNames[i] = players[i].value;
    }

    // get the characters from local storage
    characters = JSON.parse(localStorage.rdibfgCharacters);
    console.log(characters);
    // get the display element
    randomizationElement = document.getElementById("rdibfgRandomization");

    // if the player count is greater than the character count throw an error messsage
    if (playerCount > characters.length) {
        // create the error message
        error = "Error: there must be more characters selected than players.";

        // set the error message
        randomizationElement.innerHTML = error;
    }
        // randomly generate character selection for each player
    else {
        // initialize txt with the start of a unordered list
        txt = "<ul>";

        // for each player get a random character
        for (j = 0; j < playerNames.length; j++) {
            // get a random number within the characters array
            random = Math.floor(Math.random() * characters.length);

            // get the character name from session storage
            characterName = JSON.parse(sessionStorage[characters[random]]).name;
            console.log(characters);
            console.log(random);
            // remove the character from characters list
            characters.splice(random, 1);
            console.log(characters);
            // assign that character to the first player
            txt += "<li>" + playerNames[j] + " will play " + characterName + "</li>";
        }
        // close the unordered list
        txt += "</ul>";

        // clear the randomization list
        randomizationElement.innerHTML = txt;
    }
}

/*********************************************************************
* This function clears the local storage for a specific game
**********************************************************************/
function clearSettings() {
    // if there is local storage for the selected game clear it out
    if (localStorage.rdibfgCharacters) {
        localStorage.removeItem('rdibfgCharacters');
    }

    // get an array of card elements
    let cards = document.getElementsByClassName('card');

    // loop through the cards resetting them to unchecked
    for (let i = 0; i < cards.length; i++) {
        // if the card is checked
        if (cards[i].classList.contains("checked")) {
            // add unchecked and remove checked
            cards[i].classList.add("unchecked");
            cards[i].classList.remove("checked");
        }
    }

    // create local storage for the character selection
    if (!localStorage.rdibfgCharacters) {
        localStorage.rdibfgCharacters = [];
    }
}

/*********************************************************************
* This function selects all the characters
**********************************************************************/
function applyAll() {
    // get an array of card elements
    let cards = document.getElementsByClassName('card');

    // loop through the cards resetting them to unchecked
    for (let i = 0; i < cards.length; i++) {
        // if the card is checked
        if (cards[i].classList.contains("unchecked")) {
            // add unchecked and remove checked
            cards[i].classList.add("checked");
            cards[i].classList.remove("unchecked");
        }

        // create an array to store the characters
        let characters = [];

        // get the characters from loacl storage
        if (localStorage.rdibfgCharacters != "")
            characters = JSON.parse(localStorage.rdibfgCharacters);

        // check to see if the character is in storage
        if (characters.indexOf(cards[i].id) == -1) {
            // add the character to the local stoarge list
            characters.push(cards[i].id);
        }
        // put the new characters list into local storage
        localStorage.rdibfgCharacters = JSON.stringify(characters);
    }
}
