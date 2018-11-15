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
            // get the characters list element
            let root = document.getElementById("charactersList");

            // get the length of the sessionStorage object
            let lslen = sessionStorage.length;

            // loop through the session storage keys displaying each one
            for (let count = 0; count < lslen; count++) {
                // create the elements
                let key = sessionStorage.key(count);
                let value = JSON.parse(sessionStorage.getItem(key));

                // only look at the characters
                if (key != "transitionCount") {
                    // append the character to root
                    displayImage(key, value, root);
                }
            }
        }
        // Display an initial character
        displayCharacter(JSON.parse(sessionStorage.getItem("Character_1")));

    }
}

// genearte the code for an image
function displayImage(key, obj, rootElement) {
    // Create the image tag
    let txt = key + "<img src='" + obj.image + "'";
    txt += " alt='" + obj.name + "'";
    txt += " class='thumbnail' id='" + key + "'";
    txt += "onmouseenter='mouseFocus(this)'";
    txt += "onmouseleave='mouseLostFocus(this)' ";
    txt += "onclick='transformCharacter(this)' />";

    // create a div element to store the image
    let character = document.createElement("div");
    character.setAttribute("class", "character");

    // set the content of the div
    character.innerHTML = txt;

    // append the div to the root
    rootElement.appendChild(character);

    // Add event listener to modify content based on certain actions being performed
    character.addEventListener("transitionend", transEndFunction);
}

// display a character's details
function displayCharacter(obj) {
    // clear the contents of role details
    document.getElementById("characterDetails").innerHTML = "";

    // create a table element
    let table = document.createElement("table");

    // set the table's id
    table.setAttribute("id", "addTable");

    // display the character details
    let txt = "<tr><td><h2>" + obj.name + "</h2>" + obj.race + " - " + obj.class + "</td><td>";
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

    // set the content of table
    table.innerHTML = txt;

    // Add event listeners to modify content based on certain actions being performed
    table.addEventListener("animationstart", animStartFunction);
    table.addEventListener("animationend", animEndFunction);

    // update the character details
    document.getElementById("characterDetails").appendChild(table);
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

    // get the status display div
    let status = document.getElementById("characterGreet");

    // set the status text
    status.innerHTML = "<h3>Good bye adventurer.</h3>";

    // load the sessionStorage object
    let obj = JSON.parse(sessionStorage.getItem(id));

    // get the character details element
    let content = document.getElementById("addTable");

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
        } else {
            // increment the rotation variable
            rotation++;

            // update the element
            content.style.transform = "rotateX(" + rotation + "deg)";
        }
    }
}

// a function to display content based on animation start
function animStartFunction() {
    // get the status display div
    let status = document.getElementById("characterGreet");

    // set the status text
    status.innerHTML = "<h3>Here I come.</h3>";
}

// a function to display content based on animation end
function animEndFunction() {
    // get the status display div
    let status = document.getElementById("characterGreet");

    // set the status text
    status.innerHTML = "<h3>Good day adventurer.</h3>";
}

// a function to display the transition count
function transEndFunction() {
    // get the status display div
    let status = document.getElementById("transitionCount");

    // a variable to store the transition count
    let transitionCount;
    console.log("transition count = " + transitionCount + " Session count = " + sessionStorage.transitionCount);
    // use session storage to track transition count
    if (sessionStorage.transitionCount) {
        // increment transition count
        transitionCount = Number(sessionStorage.transitionCount) + 1;
        console.log("transition count = " + transitionCount + " Session count = " + sessionStorage.transitionCount);
    } else {
        // initialize transition count session storage
        transitionCount = 1;
        console.log("transition count = " + transitionCount + " Session count = " + sessionStorage.transitionCount);
    }
    // store transition count
    sessionStorage.transitionCount = transitionCount;
    console.log("transition count = " + transitionCount + " Session count = " + sessionStorage.transitionCount);

    // set the status text
    status.innerHTML = "<h3>The transition count is: " + transitionCount + ".</h3>";
}