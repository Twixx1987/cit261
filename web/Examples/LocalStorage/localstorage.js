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
function loadStorage(xhttp) {
    // call load local to load the JSON file
    var success = loadLocal(xhttp);

    // check for success
    if (success) {
        // initialize the session storage displayed data
        if (sessionStorage.clicks) {
            document.getElementById("sessionClick").innerHTML = sessionStorage.clicks;
        } else {
            document.getElementById("sessionClick").innerHTML = 0;
        }
        if (sessionStorage.selectChanges) {
            document.getElementById("sessionSelect").innerHTML = sessionStorage.selectChanges;
        } else {
            document.getElementById("sessionSelect").innerHTML = 0;
        }

        // load the select options
        loadOptions();
    } else {
        // create an error string to display
        var error = "Failed to load the data into storage.";

        // create a p element
        var errorElement = document.createElement("p");

        // set the content of the p element
        errorElement.innerHTML = error;

        // append the p to the display div
        document.getElementById("pandemicDisplay").appendChild(errorElement);
    }
}

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/jsref/prop_win_localstorage.asp
**********************************************************************/
// reload the json file contents into local storage
function loadLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        var pandemicObj = JSON.parse(xhttp.responseText);

        // loop through the object adding properties to local storage
        for (var version in pandemicObj.versions) {
            // get the key and value strings from the JSON object
            var key = pandemicObj.versions[version].version;
            var value = JSON.stringify(pandemicObj.versions[version].roles);

            // check to see if the data is already in storage
            if (localStorage.getItem(key) == value) {
                // break out of the loop, the data is already in storage no need to repopulate the data
                console.log("Data already in storage " + localStorage.getItem(key));
                break;
            }

            // append version to local storage
            localStorage.setItem(key, value);
        }
        // notification text
        var txt = "<h3>The local storage data has been loaded.</h3>"
        // Notify the user that local storage is reloaded
        document.getElementById("pandemicDisplay").innerHTML = txt;

        // return that it succeeded
        return true;
    } else {
        // create an error string to display
        var error = "<h3>Your browser does not support web storage,"
                  + " this page requires local storage support.</h3>";

        // Notify the user that local storage is not supported
        document.getElementById("pandemicDisplay").innerHTML = error;

        // return that it failed
        return false;
    }
}

// generate the select options
function loadOptions() {
    // get the select element
    var selectlist = document.getElementById("version");

    // get the length of the localStorage object
    var lslen = localStorage.length;

    // loop through the local storage keys adding them to the select list
    for (var count = 0; count < lslen; count++) {
        // create the option element
        var option = document.createElement("option");

        // set its properties
        option.setAttribute("value", localStorage.key(count));
        option.innerHTML = localStorage.key(count);

        // add the option to the list
        selectlist.appendChild(option);
    }
}

// clear the local storage
function deleteLocal() {
    // call the local storage clear method
    localStorage.clear();
    console.log("cleared local storage object");

    // display an error message indicating that local storage has been deleted
    txt = "<h3>Local storage deleted.</h3>";

    // display the data from the local storage in a nice format
    document.getElementById("pandemicDisplay").innerHTML = txt;
}

// display all versions
function displayAll() {
    // update the session storage value
    if (sessionStorage.clicks) {
        sessionStorage.clicks = Number(sessionStorage.clicks) + 1;
    } else {
        sessionStorage.clicks = 1;
    }

    // update the displayed value
    document.getElementById("sessionClick").innerHTML = sessionStorage.clicks;

    // create a variable to store the output
    var txt = "";

    // get the select element
    var selectValue = document.getElementById("version").value;

    // check to see if local storage exists
    if (localStorage.getItem(selectValue) === null) {
        // display an error message indicating no local storage
        txt = "<h3>Error: Local storage is not currently loaded.</h3>";
        console.log(txt);
    } else {
        // get the length of the localStorage object
        var lslen = localStorage.length;

        // create a variable to store the output
        txt = "<h1>Pandemic Board Game</h1>";

        // loop through the local storage keys displaying each one
        for (var count = 0; count < lslen; count++) {
            // create the option element
            var key = localStorage.key(count);
            var value = JSON.parse(localStorage.getItem(key));

            // display the version
            txt += displayVersion(key, value);
        }
    }
    // display the data from the local storage in a nice format
    document.getElementById("pandemicDisplay").innerHTML = txt;
}

// display the selected version
function versionSelect() {
    // update the session storage value
    if (sessionStorage.selectChanges) {
        sessionStorage.selectChanges = Number(sessionStorage.selectChanges) + 1;
    } else {
        sessionStorage.selectChanges = 1;
    }

    // update the displayed value
    document.getElementById("sessionSelect").innerHTML = sessionStorage.selectChanges;

    // create a variable to store the output
    var txt = "";

    // get the select element
    var selectValue = document.getElementById("version").value;

    // check to see if local storage exists
    if (localStorage.getItem(selectValue) === null) {
        // display an error message indicating no local storage
        txt = "<h3>Error: Local storage is not currently loaded.</h3>";
        console.log(txt);
    } else {
        // display the selected version
        txt = displayVersion(selectValue, JSON.parse(localStorage.getItem(selectValue)));
    }
    // display the data from the JSON file in a nice format
    document.getElementById("pandemicDisplay").innerHTML = txt;
}

// display a version in a table format
function displayVersion(header, obj) {
    // Create a Header
    var txt = "<h2>" + header + "</h2>";

    // start the table and add the columns
    txt += "<table><tr><th>Role</th><th>Abilities</th></tr>";

    // loop through the object getting all the characters to display
    for (var arrayVal = 0; arrayVal < obj.length; arrayVal++) {
        txt += "<tr><td>" + obj[arrayVal].name + "</td><td>" +
            obj[arrayVal].abilities + "</td></tr>";
    }

    // close the table
    txt += "</table>";

    // return the content
    return txt;
}