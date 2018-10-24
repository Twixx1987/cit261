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

        // check to see if the data is already in storage
        if (!sessionStorage.getItem("clicks")) {
            console.log("The number of clicks is: " + sessionStorage.getItem("clicks"));
            // initialize the sessionStorage items
            sessionStorage.setItem("clicks", 0);
            sessionStorage.setItem("selectChanges", 0);
        }

        // load the select options
        loadOptions();
    } else {
        // create an error string to display
        var error = "Your browser does not support web storage,"
                  + " this page requires local storage support.";

        // Notify the user that local storage is not supported
        document.getElementById("pandemicDisplay").innerHTML = error;
    }
}

// generate the select options
function loadOptions() {
    // get the select element
    var selectlist = document.getElementById("version");

    // get the length of the localStorage object
    var lslen = localStorage.length - 1;

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

// display all versions
function displayAll() {
    // update the session storage value
    sessionStorage.clicks = Number(sessionStorage.clicks) + 1;

    // update the displayed value
    document.getElementById("sessionClick").innerHTML = sessionStorage.clicks;

    // get the length of the localStorage object
    var lslen = localStorage.length - 1;

    // create a variable to store the output
    var txt = "<h1>Pandemic Board Game</h1>";

    // loop through the local storage keys displaying each one
    for (var count = 0; count < lslen; count++) {
        // create the option element
        var key = localStorage.key(count);
        var value = JSON.parse(localStorage.getItem(key));

        // display the version
        txt += displayVersion(key, value);
    }
    // display the data from the local storage in a nice format
    document.getElementById("pandemicDisplay").innerHTML = txt;
}

// display the selected version
function versionSelect() {
    // update the session storage value
    sessionStorage.selectChanges = Number(sessionStorage.selectChanges) + 1;

    // update the displayed value
    document.getElementById("sessionSelect").innerHTML = sessionStorage.selectChanges;

    // get the select element
    var selectValue = document.getElementById("version").value;

    // display the selected version
    var txt = displayVersion(selectValue, JSON.parse(localStorage.getItem(selectValue)));

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