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

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/jsref/prop_win_localstorage.asp
**********************************************************************/
// reload the json file contents into session storage
function loadLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        let rdiObj = JSON.parse(xhttp.responseText);

        // create a counter to use as the key for session storage
        let count = 1;

        // loop through the object adding properties to session storage
        for (let version in rdiObj.versions) {
            // loop through the characters adding them to session storage
            for (let character in rdiObj.versions[version].characters) {
                // get the character image string for the key
                let key = "Character_" + count;

                // get the character object and append the version and key to its members
                let characterObj = rdiObj.versions[version].characters[character];
                characterObj.version = rdiObj.versions[version].version;

                // stringify the character objectto store it in session storage
                let value = JSON.stringify(characterObj);

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
        document.getElementById("characterDetails").innerHTML = error;

        // return that it failed
        return false;
    }
}

// generate the select options
function loadContent(xhttp) {
    // call load session to load the JSON file
    let success = loadLocal(xhttp);

    // create a string variable to store the display contents
    let txt = "";

    // check to see that loadLocal executed
    if (success) {
        // check to see if session storage exists
        if (sessionStorage.getItem("Character_1") === null) {
            // display an error message indicating no session storage
            txt = "<h3>Error: Local storage is not currently loaded.</h3>";

        } else {
            // get the length of the sessionStorage object
            let lslen = sessionStorage.length;
            
            // loop through the session storage keys displaying each one
            for (let count = 0; count < lslen; count++) {
                // create the option element
                let key = sessionStorage.key(count);
                let value = JSON.parse(sessionStorage.getItem(key));

                // display the version
                txt += displayImage(key, value);
            }
        }
        // display the data from the session storage in a nice format
        document.getElementById("charactersList").innerHTML = txt;

        // Display an initial character
        displayCharacter(JSON.parse(sessionStorage.getItem("Character_1")));

    }
}

// genearte the code for an image
function displayImage(key, obj) {
    // Create the image tag
    let txt = "<div>" + key + "<img src='" + obj.image + "'";
    txt += " alt='" + obj.name + "'";
    txt += " class='thumbnail' id='" + key + "'";
    txt += "onmouseenter='mouseFocus(this)'";
    txt += "onmouseleave='mouseLostFocus(this)' ";
    txt += "onclick='transformCharacter(this)' /></div>";

    // return the content
    return txt;
}

// display a character's details
function displayCharacter(obj) {
    // start the table and add the columns
    let txt = "<table>";

    // display the character details
    txt += "<tr><td><h2>" + obj.name + "</h2>" + obj.race + " - " + obj.class + "</td><td>";
    if (obj.good === undefined) {
        txt += "";
    } else {
        txt += "<p><em>The Good:</em> " + obj.good + "</p>";
    }
    txt += "<p><em>The Bad:</em> " + obj.bad + "</p>";
    if (obj.worse === undefined) {
        txt += "</td><td>";
    } else {
        txt += "<p><em>The Worse:</em> " + obj.worse + "</p></td><td>";
    }
    txt += "<img src='" + obj.image + "'" + " alt='" + obj.name + "'"
        + " height='200' width='200' id='" + obj.image + "'></td></tr>";

    // close the table
    txt += "</table>";

    // update the character details
    document.getElementById("characterDetails").innerHTML = txt;
}

// a function to animate the image on mouse over
function mouseFocus(element) {
    // add the image-expand class
    element.classList.add("image-expand");
}

// a function to animate the image on mouse over
function mouseLostFocus(element) {
    // remove the image-expand class
    element.classList.remove("image-expand");
}

// a function to transform the character display
function transformCharacter(element) {
    // get the id of the element
    let id = element.getAttribute("id");

    // load the sessionStorage object
    let obj = JSON.parse(sessionStorage.getItem(id));

    // get the character details element
    let content = document.getElementById("characterDetails");

    // set the rotation variable
    let rotation = 0;

    // set the timer interval
    let interval = setInterval(frame, 3);

    // rotation transform the element
    function frame() {
        // if the elements are rotated 90 degrees
        if (rotation == 90) {
            clearInterval(interval);

            // update the contents
            displayCharacter(obj);

            // set the timer interval
            let interval2 = setInterval(frame2, 3);

            // rotation transform the element back to starting position
            function frame2() {
                // if the elements are rotated 0 degrees
                if (rotation == 0) {
                    clearInterval(interval2);
                } else {
                    // increment the rotation variable
                    rotation--;

                    // update the element
                    content.style.transform = "rotateX(" + rotation + "deg)";
                }
            }
        } else {
            // increment the rotation variable
            rotation++;

            // update the element
            content.style.transform = "rotateX(" + rotation + "deg)";
        }
    }
}