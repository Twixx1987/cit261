/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/js/js_ajax_http_response.asp
**********************************************************************/
// open a JSON File and perform some action
function openJson(url, callbackFunc) {
    // initiate a new XMLHttp request
    var xmlhttp = new XMLHttpRequest();

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

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/jsref/prop_win_localstorage.asp
**********************************************************************/
// load the json file contents into local storage
function loadData(xhttp) {
    // populate the tables
    populateTableData(xhttp);

    // create an array of players
    var players = ["CloudStrife", "JakDaxter4Ever", "LinkToThePast", "MarioManiac", "MasterChief"];

    // get the form element
    var list = document.getElementById("playersList");

    // a count variable to process the loop
    var count = 0;

    // populate the list of players
    while (count < players.length) {
        // create list item element
        var listItem = document.createElement("li");

        // set the list item inner html
        listItem.innerHTML = players[count];
        
        // append the element to the list
        list.appendChild(listItem);

        // increase count
        count++;
    }
}

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/jsref/prop_win_localstorage.asp
**********************************************************************/
// load the json file contents into local storage
function populateTableData(xhttp) {
    // get the rdi-bfgDisplay div
    var div = document.getElementById("rdi-bfgDisplay");

    // parse the response
    var bfgObj = JSON.parse(xhttp.responseText);

    // create the header and add it to the rdi-bfgDisplay div
    var title = document.createElement("h1");
    title.innerHTML = bfgObj.game;
    div.appendChild(title);

    // loop through the versions of the object adding children
    for (var version in bfgObj.versions) {
        // create a table object
        var newTable = document.createElement("table");

        // create the table data
        createTable(newTable, bfgObj.versions[version]);

        // append the table to the div
        div.appendChild(newTable);

        // create a title for the table
        var versionHead = document.createElement("h2");
        versionHead.innerHTML = bfgObj.versions[version].version;

        // append the title before the table
        div.insertBefore(versionHead, newTable);
    }
}

// display all versions
function createTable(appendTo, object) {
    // create an array for the header details
    var headerArray = ["Damage Die", "Abilities"];

    // create the header row
    var tableHeader = document.createElement("tr");

    // create the character header data and append it to table header
    var charHeader = document.createElement("th");
    charHeader.innerHTML = "Character";
    charHeader.setAttribute("rowspan", "2");
    tableHeader.appendChild(charHeader);

    // loop adding level headers to the table
    for (var i = 1; i < 4; i++) {
        // create the level header
        var levelHeader = document.createElement("th");
        levelHeader.setAttribute("colspan", "2");
        levelHeader.innerHTML = "Level " + i;

        // add the header to the header row
        tableHeader.appendChild(levelHeader);
    }

    // create the Remove node header and append it to table header
    var removeNode = document.createElement("th");
    removeNode.innerHTML = "Remove Row";
    removeNode.setAttribute("rowspan", "2");
    tableHeader.appendChild(removeNode);

    // create a second header row
    var tableHeader2 = document.createElement("tr");

    // loop through the header array adding each item to the header
    for (var j = 0; j < 3; j++) {
        // create the header data
        var diceHeader = document.createElement("th");
        var abilityHeader = document.createElement("th");
        diceHeader.innerHTML = headerArray[0];
        abilityHeader.innerHTML = headerArray[1];

        // append these to the header row
        tableHeader2.appendChild(diceHeader);
        tableHeader2.appendChild(abilityHeader);
    }

    // append the table header to the table
    appendTo.appendChild(tableHeader);
    appendTo.appendChild(tableHeader2);

    // loop through the characters adding them to the table
    for (var character in object.characters) {
        // create the row
        createRow(appendTo, object.characters[character]);
    }
}

// display a version in a table format
function createRow(appendTo, object) {
    // create a table row
    var newRow = document.createElement("tr");
    newRow.setAttribute("id", object.name);

    // create the character table data point
    var characterElement = document.createElement("td");
    characterElement.innerHTML = object.name;

    // append the character data point to the row
    newRow.appendChild(characterElement);

    // loop through the levels adding data to the row
    for (var level in object.levels) {
        // create the damage die table data point
        var damageElement = document.createElement("td");
        damageElement.innerHTML = object.levels[level].damage;

        // create the abilities table data point
        var abilitiesElement = document.createElement("td");
        abilitiesElement.innerHTML = object.levels[level].abilities;

        // append the data points to the row
        newRow.appendChild(damageElement);
        newRow.appendChild(abilitiesElement);
    }

    // create the remove button element and button and add them heirarchially
    var removeData = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.setAttribute("onclick", "removeElement('" + object.name + "')");
    removeButton.innerHTML = "Remove " + object.name;
    removeData.appendChild(removeButton);
    newRow.appendChild(removeData);

    // append the row to the append to object
    appendTo.appendChild(newRow);
}

// a function to remove an element from the DOM
function removeElement(id) {
    // get the element by id
    var removeItem = document.getElementById(id);

    // remove the element
    removeItem.parentElement.removeChild(removeItem);
}

// A function to restore the tables
function restoreTables() {
    // reset the inner html of the rdi-bfgDisplay div
    document.getElementById("rdi-bfgDisplay").innerHTML = "";

    // call the openJson function with the loadData callback function
    openJson("rdi-bfg.json", populateTableData);
}

// a function to create a random associative array of player and character
function createRandomAssociative() {
    // create an array of the players
    var players = ["CloudStrife", "JakDaxter4Ever", "LinkToThePast", "MarioManiac", "MasterChief"];

    // create empty arrays for the player-character combo and characters that are still on the page
    var playerCharacterArray = [];
    var characters = [];

    // get the character elements
    var tableRows = document.getElementsByTagName("tr");

    // loop through the table row elements
    for (var l = 0; l < tableRows.length; l++) {
        // check to see that the current row has an ID
        if (tableRows[l].attributes.id) {
            // add the id to the characters list
            characters.push(tableRows[l].attributes.id);
        }
    }

    // randomize the order of characters
    characters.sort(function (a, b) { return 0.5 - Math.random() });

    // create a counter variable
    var m = 0;

    // populate the associative array
    do {
        // populate the array
        playerCharacterArray[players[m]] = characters[m];

        // increment m
        m++;
    } while (m < players.length)

    // create a text string to return to the inner html of the results
    var text = "";

    // populate the return text
    for (var player in playerCharacterArray) {
        text += '"' + player + '" will play "' + playerCharacterArray[player] + '"<br/>';
    }

    // set the array results innerHTML value   
    document.getElementById("arrayResults").innerHTML = text;
}