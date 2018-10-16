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

// generate the select options
function loadOptions(xhttp) {
    // create an object and parse the JSON file
    var versionsObj = JSON.parse(xhttp.responseText);

    // get the select element
    var selectlist = document.getElementById("version");

    // loop through the object members adding items 
    for (var version in versionsObj.versions) {
        // create the option element
        var option = document.createElement("option");

        // set its properties
        option.setAttribute("value", versionsObj.versions[version].version);
        option.innerHTML = versionsObj.versions[version].version;

        // add the option to the list
        selectlist.appendChild(option);
    }
}

// display the RDI File contents
function openRDIfile(xhttp) {
    // create an object and parse the JSON file
    var rdiObj = JSON.parse(xhttp.responseText);

    // Create a Header
    var txt = "<h1>" + rdiObj.game + "</h1>";

    // loop through the object getting all the properties to display
    for (var version in rdiObj.versions) {
        // append the formatted data
        txt += displayVersion(rdiObj.versions[version]);
    }

    // display the data from the JSON file in a nice format
    document.getElementById("rdiDisplay").innerHTML = txt;
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

function displayVersion(obj) {
    // Create a Header
    var txt = "<h2>" + obj.version + "</h2>";

    // start the table and add the columns
    txt += "<table><tr><th>Name</th><th>Race</th><th>Class</th><th>The Good</th><th>The Bad</th><th>The Worse</th></tr>";

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