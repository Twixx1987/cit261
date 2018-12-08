/******************************************************************
* The following menu code comes from W3Schools.com
* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav
******************************************************************/
function menuToggle() {
    // get the menu
    let x = document.getElementById("menu");

    // set the menus classes based on current classes
    if (x.className === "menu") {
        // add responsive
        x.className += " responsive";
    } else {
        // reset to menu only
        x.className = "menu";
    }
}

/******************************************************************
* The following menu code comes from W3Schools.com
* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs
******************************************************************/
function switchTab(evt, tabName) {
    // initialize variables
    let i, tabcontent, tablinks;

    // remove all tabs from display
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // get the tab that was clicked and display it
    document.getElementById(tabName).style.display = "block";

    // set the current tab button to active
    evt.currentTarget.className += " active";
}


/******************************************************************
* A function to add player name inputs to the form
******************************************************************/
function listPlayers() {
    // initialize variables
    let inputCount, playerNames, playerCount, form, i, player;

    // get the entered value
    inputCount = document.getElementById("numPlayers").value;

    // get the player input fields
    playerNames = document.getElementsByClassName("players");

    // get the count of player input fields
    playerCount = playerNames.length;

    // get the form for input addition
    form = document.getElementById("form");

    // add players based on the input
    if (playerCount < inputCount) {
        // loop through adding fields as needed
        for (i = playerCount + 1; i <= inputCount; i++) {
            // create an element with proper settings
            player = document.createElement("input");
            player.className = "players";
            player.id = "player" + i;
            player.type = "text";
            player.placeholder = "Player " + i;

            // add the player element and a break to the form
            form.appendChild(player);
            form.appendChild(document.createElement("br"));
        }
    }
    // remove players based on the imput 
    else if (playerCount > inputCount) {
        // loop through removing fields as needed
        for (i = playerCount; i > inputCount; i--) {
            // get the current player element
            player = document.getElementById("player" + i);

            // remove the player element and a break from the form
            form.removeChild(player);
            form.removeChild(form.lastElementChild);
        }
    }
    // otehrwise do nothing
}

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/js/js_ajax_http_response.asp
**********************************************************************/
// open a JSON File and perform some action
function openJson(url, callbackFunc) {
    // initiate a new XMLHttp request
    let xmlhttp = new XMLHttpRequest();

    // function to perform upon request completion
    xmlhttp.onreadystatechange = function () {
        // check for completion and ok status
        if (this.readyState == 4 && this.status == 200) {
            // initiate callback function
            callbackFunc(this);
        }
    }
    // create the request specifics
    xmlhttp.open("GET", url, true);

    // send the request to the server
    xmlhttp.send();
}

// generate the settings list
function loadPandemic(xhttp) {
    // create an object and parse the JSON file
    let pandemicObj = JSON.parse(xhttp.responseText);

    // create a counter to use as the role id
    let count = 1;

    // create a string variable to store the display contents
    let txt = "";

    // loop through the object adding properties to session storage
    for (let version in pandemicObj.versions) {
        // loop through the characters adding them to session storage
        for (let role in pandemicObj.versions[version].roles) {
            // get the character string for the id
            let id = "Role_" + (count < 10 ? "0" + count : count);

            // get the character object and append the version to its members
            let roleObj = pandemicObj.versions[version].roles[role];
            roleObj.version = pandemicObj.versions[version].version;
            
            // display the version
            txt += displayImage(id, value);

            // increment count
            count++;
        }
    }
    // display the data from the session storage in a nice format
    document.getElementById("rolesList").innerHTML = txt;
}

// genearte the code for an image
function displayImage(id, obj) {
    // Create the image tag
    let txt = "<div id='" + id + "' class='card transition-all element-3d'"
       + " onclick='transformCharacter(this)' >"
       + "<div class='face front'><img src='" + obj.image + "'"
       + " alt='" + obj.name + "'"
       + " class='thumbnail' id='" + id + "'/></div>"
       + "<div class='face back'><img src='RoleBack.jpg'"
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