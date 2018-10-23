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
            // append version to local storage
            localStorage.setItem(pandemicObj.versions[version], pandemicObj.versions["roles"]);
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

// display the selected version
function versionSelect(xhttp) {
    // create an object and parse the JSON file
    var rdiObj = JSON.parse(xhttp.responseText);

    // get the select element
    var selectValue = document.getElementById("version").value;

    // loop through the object getting all the properties to display
    for (var version in rdiObj.versions) {
        if (rdiObj.versions[version].version == selectValue) {
            // append the formatted data
            var txt = displayVersion(rdiObj.versions[version]);
        }
    }

    // display the data from the JSON file in a nice format
    document.getElementById("rdiDisplay").innerHTML = txt;
}

// display the stringified object
function versionStringify(xhttp) {
    // create an object and parse the JSON file
    var rdiObj = JSON.parse(xhttp.responseText);

    // get the select element
    var selectValue = document.getElementById("version").value;

    // loop through the object getting all the properties to display
    for (var version in rdiObj.versions) {
        if (rdiObj.versions[version].version == selectValue) {
            // create an object to stringify
            var obj = { name: rdiObj.versions[version].characters[0].name, version: rdiObj.versions[version].version };
        }
    }

    // stringify the object
    var stringified = JSON.stringify(obj);

    // display the stringified object on the page
    document.getElementById("stringify").innerHTML = stringified;
}

// display a version in a table format
function displayVersion(obj) {
    // Create a Header
    var txt = "<h2>" + obj.version + "</h2>";

    // start the table and add the columns
    txt += "<table><tr><th>Name</th><th>Race</th><th>Class</th><th>The Good</th>"
        + "<th>The Bad</th><th>The Worse</th></tr>";

    // loop through the object getting all the characters to display
    for (var character in obj.characters) {
        txt += "<tr><td>" + obj.characters[character].name + "</td><td>" +
            obj.characters[character].race + "</td><td>" +
            obj.characters[character].class + "</td><td>";
        if (obj.characters[character].good === undefined) {
            txt += "</td><td>";
        } else {
            txt += obj.characters[character].good + "</td><td>";
        }
        txt += obj.characters[character].bad + "</td><td>";
        if (obj.characters[character].worse === undefined) {
            txt += "</td></tr>";
        } else {
            txt += obj.characters[character].worse + "</td></tr>";
        }
    }

    // close the table
    txt += "</table>";

    // return the content
    return txt;
}