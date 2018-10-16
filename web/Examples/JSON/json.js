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
    var txt = "<h2>" + rdiObj.game + "</h2>";

    // loop through the object getting all the properties to display
    for (var version in rdiObj.versions) {
        txt += "<table><tr><th colspan='6'>" + rdiObj.versions[version].version + "</th></tr>";
        txt += "<tr><th>Name</th><th>Race</th><th>Class</th><th>The Good</th><th>The Bad</th><th>The Worse</th></tr>";

        // loop through the object getting all the characters to display
        for (var character in rdiObj.versions[version].characters) {
            txt += "<tr><td>" + rdiObj.versions[version].characters[character].name + "</td><td>" +
                rdiObj.versions[version].characters[character].race + "</td><td>" +
                rdiObj.versions[version].characters[character].class + "</td><td>";
            if (rdiObj.versions[version].characters[character].good === undefined) {
                txt += "</td><td>";
            } else {
                txt += rdiObj.versions[version].characters[character].good + "</td><td>";
            }
            txt += rdiObj.versions[version].characters[character].bad + "</td><td>";
            if (rdiObj.versions[version].characters[character].worse === undefined) {
                txt += "</td></tr>";
            } else {
                txt += rdiObj.versions[version].characters[character].worse + "</td></tr>";
            }
        }
    }

    // display the data from the JSON file in a nice format
    document.getElementById("rdiDisplay").innerHTML = txt;
}

// display the selected version
function versionSelect(xhttp) {
    // create an object and parse the JSON file
    var rdiObj = JSON.parse(xhttp.responseText);

    // Create a Header
    var txt = "<h2>" + rdiObj.game + "</h2>";

    // get the select element
    txt += document.getElementById("version").value;

    //// loop through the object getting all the properties to display
    //for (var version in rdiObj.versions) {
    //    if (rdiObj.versions[version].version == this.value) {
    //        txt += "<table><tr><th colspan='6'>" + rdiObj.versions[version].version + "</th></tr>";
    //        txt += "<tr><th>Name</th><th>Race</th><th>Class</th><th>The Good</th><th>The Bad</th><th>The Worse</th></tr>";

    //        // loop through the object getting all the characters to display
    //        for (var character in rdiObj.versions[version].characters) {
    //            txt += "<tr><td>" + rdiObj.versions[version].characters[character].name + "</td><td>" +
    //                rdiObj.versions[version].characters[character].race + "</td><td>" +
    //                rdiObj.versions[version].characters[character].class + "</td><td>";
    //            if (rdiObj.versions[version].characters[character].good === undefined) {
    //                txt += "</td><td>";
    //            } else {
    //                txt += rdiObj.versions[version].characters[character].good + "</td><td>";
    //            }
    //            txt += rdiObj.versions[version].characters[character].bad + "</td><td>";
    //            if (rdiObj.versions[version].characters[character].worse === undefined) {
    //                txt += "</td></tr>";
    //            } else {
    //                txt += rdiObj.versions[version].characters[character].worse + "</td></tr>";
    //            }
    //        }
    //    }
    //}

    // display the data from the JSON file in a nice format
    document.getElementById("rdiDisplay").innerHTML = txt;
}