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
    // get the rdi-bfgDisplay div
    var div = document.getElementById("rdi-bfgDisplay");

    // parse the response
    var bfgObj = JSON.parse(xhttp.responseText);

    // create the header and add it to the rdi-bfgDisplay div
    var title = document.create("h1");
    title.innerHTML = bfgObj.game;
    div.appendChild(title);

    // loop through the versions of the object adding children
    for (var version in bfgObj.versions) {
        // create a table object
        var newTable = document.createElement("table");

        // create the table data
        createTable(newTable, version);

        // append the table to the div
        div.appendChild(newTable);

        // create a title for the table
        var versionHead = document.createElement("h2");
        versionHead.innerHTML = bfgObj.versions[version];

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

    // create a counter variable
    var i = 1;

    // loop adding level headers to the table
    while (i < 4) {
        // create the level header
        var levelHeader = document.createElement("th");
        levelHeader.setAttribute("colspan", "2");
        levelHeader.innerHTML = "Level " + i;

        // add the header to the header row
        tableHeader.appendChild(levelHeader);
    }

    // loop through the header array adding each item to the header
    for (var j = 0; j < 3; j++) {
        // create the header data
        var diceHeader = document.createElement("th");
        var abilityHeader = document.createElement("th");
        diceHeader.innerHTML = headerArray[0];
        abilityHeader.innerHTML = headerArray[1];

        // append these to the header row
        tableHeader.appendChild(diceHeader);
        tableHeader.appendChild(abilityHeader);
    }

    // append the table header to the table
    appendTo.appendChild(tableHeader);

    // loop through the characters adding them to the table
    for (var character in object.characters) {
        // create the row
        createRow(appendTo, character);
    }
}

// display a version in a table format
function createRow(appendTo, object) {
    // create a table row
    var newRow = document.createElement("tr");

    // create the character table data point
    var characterElement = document.createElement("td");
    characterElement.innerHTML = object.character;

    // append the character data point to the row
    newRow.appendChild(characterElement);

    // loop through the levels adding data to the row
    for (var level in object.levels) {
        // create the damage die table data point
        var damageElement = document.createElement("td");
        damageElement.innerHTML = object.character[level].damage;

        // create the abilities table data point
        var abilitiesElement = document.createElement("td");
        abilitiesElement.innerHTML = object.character[level].abilities;

        // append the data points to the row
        newRow.appendChild(damageElement);
        newRow.appendChild(abilitiesElement);
    }

    // append the row to the append to object
    appendTo.appendChild(newRow);
}