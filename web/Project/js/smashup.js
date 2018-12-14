/******************************************************************
* A function to load the smashup file to local storage
******************************************************************/
function loadSmashupLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        let smashupObj = JSON.parse(xhttp.responseText);

        // create a counter to use as the key for session storage
        let count = 1;

        // loop through the object adding properties to session storage
        for (let version in smashupObj.versions) {
            // loop through the characters adding them to session storage
            for (let faction in smashupObj.versions[version].factions) {
                // get the character image string for the key
                let key = "Smashup_Faction_" + (count < 10 ? "0" + count : count);

                // get the character object and append the version and key to its members
                let factionObj = smashupObj.versions[version].factions[faction];
                factionObj.version = smashupObj.versions[version].version;

                // stringify the character objectto store it in session storage
                let value = JSON.stringify(factionObj);

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
        document.getElementById("factionsList").innerHTML = error;

        // return that it failed
        return false;
    }
}


/******************************************************************
* A function to load the smashup data to the page
******************************************************************/
function loadSmashup(xhttp) {
    // call load session to load the JSON file
    let success = loadSmashupLocal(xhttp);

    // create a string variable to store the display contents
    let txt = "";

    // check to see that loadLocal executed
    if (success) {
        // check to see if session storage exists
        if (sessionStorage.getItem("Smashup_Faction_01") === null) {
            // display an error message indicating no session storage
            txt = "<h3>Error: Local storage failed to load properly.</h3>";

        } else {
            // get the length of the sessionStorage object
            let lslen = sessionStorage.length;

            // loop through the session storage keys displaying each one
            for (let count = 0; count < lslen; count++) {
                // create the option element
                let key = sessionStorage.key(count);
                
                // check to see if the session storage item is a smashup faction
                if (key.search("Smashup_Faction_") != -1) {
                    // get the value object
                    let value = JSON.parse(sessionStorage.getItem(key));

                    // display the version
                    txt += displaySmashupImage(key, value);
                }
            }
        }
        // display the data from the session storage in a nice format
        document.getElementById("factionsList").innerHTML = txt;
    }
}

/******************************************************************
* A function to genearte the code for an image
******************************************************************/
function displaySmashupImage(id, obj) {
    // create local storage for the faction selection
    if (!localStorage.smashupFactions) {
        localStorage.smashupFactions = [];
    }

    // Create the image tag
    let txt = "<div id='" + id + "' class='card transition-all element-3d "
       + (localStorage.smashupFactions.indexOf(id) != -1 ? " checked" : "unchecked")
       + "' onclick='smashupFactionsDetails(this)'>"
       + "<div class='face front'><img src='../images/SmashUp/" + obj.image + "'"
       + " alt='" + obj.name + "'"
       + " class='thumbnail' id='" + id + "'/></div>"
       + "<div class='face back'><img src='../images/SmashUp/SmashupBack.png'"
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
* A function to display the faction details
******************************************************************/
function smashupFactionsDetails(element) {
    // get the id of the element
    let id = element.getAttribute("id");

    // create an array to store the factions
    let factions = [];

    // get the factions from loacl storage
    if (localStorage.smashupFactions != "")
        factions = JSON.parse(localStorage.smashupFactions);

    // check to see if the faction is in storage
    if (factions.indexOf(id) != -1) {
        // remove the faction from local storage
        factions.splice(factions.indexOf(id), 1);
    } else {
        // add the faction to the local stoarge list
        factions.push(id);
    }
    // put the new factions list into local storage
    localStorage.smashupFactions = JSON.stringify(factions);
    
    // get the detail div
    let detail = document.getElementById("details");
    
    // get the current detail content
    let currentDetail = detail.firstChild;

    // toggle the classes for the selected card
    element.classList.toggle("checked");
    element.classList.toggle("unchecked");

    // load the sessionStorage object
    let obj = JSON.parse(sessionStorage.getItem(id));

    // create an element to display the new faction details
    let newDetail = document.createElement("div");
    newDetail.innerHTML = "<h4>" + obj.name + "</h4><p>" + obj.description + "</p>";

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

                // insert the details element into the factions list element
                detail.appendChild(newDetail);
            } else {
                // decrement the fade variable
                timer++;
            }
        }
    }
    // just fade in the new detail
    else {
        // insert the details element into the factions list element
        detail.appendChild(newDetail);
    }

}

/******************************************************************
* A function to display the faction details
******************************************************************/
function generateSmashup() {
    // initialize the variables
    let playerCount, i, randomizationElement, error, j, random, txt, factionName1, factionName2;
    let players, playerNames = [], factions = [];

    // get the player count
    playerCount = document.getElementById("numPlayers").value;

    // get the player class elements
    players = document.getElementsByClassName("players");

    //loop through the players elements getting the values for the player names array
    for (i = 0; i < players.length; i++) {
        playerNames[i] = players[i].value;
    }

    // get the factions from local storage
    factions = JSON.parse(localStorage.smashupFactions);

    // get the display element
    randomizationElement = document.getElementById("smashupRandomization");

    // if the player count is greater than the faction count throw an error messsage
    if (playerCount > factions.length / 2) {
        // create the error message
        error = "Error: there must be at least twice as many factions selected as there are players.";

        // set the error message
        randomizationElement.innerHTML = error;
    }
    // randomly generate faction selection for each player
    else {
        // initialize txt with the start of a unordered list
        txt = "<ul>";

        // for each player get a random faction
        for (j = 0; j < playerNames.length; j++) {
            // get a random number within the factions array
            random = Math.floor(Math.random() * factions.length);

            // get the first faction name from session storage
            factionName1 = JSON.parse(sessionStorage[factions[random]]).name;

            // remove the faction from factions list
            factions.splice(factions.indexOf(random), 1);

            // get a new random number within the factions array
            random = Math.floor(Math.random() * factions.length);

            // get the second faction name from session storage
            factionName2 = JSON.parse(sessionStorage[factions[random]]).name;

            // remove the faction from factions list
            factions.splice(factions.indexOf(random), 1);

            // assign that faction to the first player
            txt += "<li>" + playerNames[j] + " will play " + factionName1 + " combined with " + factionName2 + "</li>";
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
    if (localStorage.smashupFactions) {
        localStorage.removeItem('smashupFactions');
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

    // create local storage for the faction selection
    if (!localStorage.smashupFactions) {
        localStorage.smashupFactions = [];
    }
}

/*********************************************************************
* This function selects all the factions
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

        // create an array to store the factions
        let factions = [];

        // get the factions from loacl storage
        if (localStorage.smashupFactions != "")
            factions = JSON.parse(localStorage.smashupFactions);

        // check to see if the faction is in storage
        if (factions.indexOf(cards[i].id) == -1) {
            // add the faction to the local stoarge list
            factions.push(cards[i].id);
        }
        // put the new factions list into local storage
        localStorage.smashupFactions = JSON.stringify(factions);
    }
}