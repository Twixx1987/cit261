/******************************************************************
* A function to load the pandemic file to local storage
******************************************************************/
function loadSmashupLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        let pandemicObj = JSON.parse(xhttp.responseText);

        // create a counter to use as the key for session storage
        let count = 1;

        // loop through the object adding properties to session storage
        for (let version in pandemicObj.versions) {
            // loop through the characters adding them to session storage
            for (let role in pandemicObj.versions[version].roles) {
                // get the character image string for the key
                let key = "Pandemic_Role_" + (count < 10 ? "0" + count : count);

                // get the character object and append the version and key to its members
                let roleObj = pandemicObj.versions[version].roles[role];
                roleObj.version = pandemicObj.versions[version].version;

                // stringify the character objectto store it in session storage
                let value = JSON.stringify(roleObj);

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
        document.getElementById("rolesList").innerHTML = error;

        // return that it failed
        return false;
    }
}


/******************************************************************
* A function to load the pandemic data to the page
******************************************************************/
function loadSmashup(xhttp) {
    // call load session to load the JSON file
    let success = loadPandemicLocal(xhttp);

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
                
                // check to see if the session storage item is a pandemic role
                if (key.search("Smashup_Faction_") != -1) {
                    // get the value object
                    let value = JSON.parse(sessionStorage.getItem(key));

                    // display the version
                    txt += displayPandemicImage(key, value);
                }
            }
        }
        // display the data from the session storage in a nice format
        document.getElementById("rolesList").innerHTML = txt;
    }
}

/******************************************************************
* A function to genearte the code for an image
******************************************************************/
function displayPandemicImage(id, obj) {
    // create local storage for the role selection
    if (!localStorage.pandemicRoles) {
        localStorage.pandemicRoles = [];
    }

    // Create the image tag
    let txt = "<div id='" + id + "' class='card transition-all element-3d "
       + (localStorage.pandemicRoles.indexOf(id) != -1 ? " checked" : "unchecked")
       + "' onclick='pandemicRoleDetails(this)'>"
       + "<div class='face front'><img src='../images/Pandemic/" + obj.image + "'"
       + " alt='" + obj.name + "'"
       + " class='thumbnail' id='" + id + "'/></div>"
       + "<div class='face back'><img src='../images/Pandemic/RoleBack.jpg'"
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
* A function to display the role details
******************************************************************/
function pandemicRoleDetails(element) {
    // get the id of the element
    let id = element.getAttribute("id");

    // create an array to store the roles
    let roles = [];

    // get the roles from loacl storage
    if (localStorage.pandemicRoles != "")
        roles = JSON.parse(localStorage.pandemicRoles);

    // check to see if the role is in storage
    if (roles.indexOf(id) != -1) {
        // remove the role from local storage
        roles.splice(roles.indexOf(id), 1);
    } else {
        // add the role to the local stoarge list
        roles.push(id);
    }
    // put the new roles list into local storage
    localStorage.pandemicRoles = JSON.stringify(roles);
    
    // get the detail div
    let detail = document.getElementById("details");
    
    // get the current detail content
    let currentDetail = detail.firstChild;

    // toggle the classes for the selected card
    element.classList.toggle("checked");
    element.classList.toggle("unchecked");

    // load the sessionStorage object
    let obj = JSON.parse(sessionStorage.getItem(id));

    // create an element to display the new role details
    let newDetail = document.createElement("div");
    newDetail.innerHTML = "<h4>" + obj.name + "</h4><p>" + obj.abilities + "</p>";

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

                // insert the details element into the roles list element
                detail.appendChild(newDetail);
            } else {
                // decrement the fade variable
                timer++;
            }
        }
    }
    // just fade in the new detail
    else {
        // insert the details element into the roles list element
        detail.appendChild(newDetail);
    }

}

/******************************************************************
* A function to display the role details
******************************************************************/
function generatePandemic() {
    // initialize the variables
    let playerCount, i, randomizationElement, error, j, random, txt, roleName;
    let players, playerNames = [], roles = [];

    // get the player count
    playerCount = document.getElementById("numPlayers").value;

    // get the player class elements
    players = document.getElementsByClassName("players");

    //loop through the players elements getting the values for the player names array
    for (i = 0; i < players.length; i++) {
        playerNames[i] = players[i].value;
    }

    // get the roles from local storage
    roles = JSON.parse(localStorage.pandemicRoles);

    // get the display element
    randomizationElement = document.getElementById("pandemicRandomization");

    // if the player count is greater than the role count throw an error messsage
    if (playerCount > roles.length) {
        // create the error message
        error = "Error: there must be more roles selected than players.";

        // set the error message
        randomizationElement.innerHTML = error;
    }
    // randomly generate role selection for each player
    else {
        // initialize txt with the start of a unordered list
        txt = "<ul>";

        // for each player get a random role
        for (j = 0; j < playerNames.length; j++) {
            // get a random number within the roles array
            random = Math.floor(Math.random() * roles.length);

            // get the role name from session storage
            roleName = JSON.parse(sessionStorage[roles[random]]).name;

            // assign that role to the first player
            txt += "<li>" + playerNames[j] + " will play " + roleName + "</li>";
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
    if (localStorage.pandemicRoles) {
        localStorage.removeItem('pandemicRoles');
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

    // create local storage for the role selection
    if (!localStorage.pandemicRoles) {
        localStorage.pandemicRoles = [];
    }
}

/*********************************************************************
* This function selects all the roles
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

        // create an array to store the roles
        let roles = [];

        // get the roles from loacl storage
        if (localStorage.pandemicRoles != "")
            roles = JSON.parse(localStorage.pandemicRoles);

        // check to see if the role is in storage
        if (roles.indexOf(cards[i].id) == -1) {
            // add the role to the local stoarge list
            roles.push(cards[i].id);
        }
        // put the new roles list into local storage
        localStorage.pandemicRoles = JSON.stringify(roles);
    }
}