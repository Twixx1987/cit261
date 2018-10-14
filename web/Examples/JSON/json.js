/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/js/tryit.asp?filename=tryjson_ajax
**********************************************************************/
// open the JSON RDI File
function openJson() {
    // initiate a new XMLHttp request
    var xmlhttp = new XMLHttpRequest();

    // function to perform upon request completion
    xmlhttp.onreadystatechange = function () {
        // check for completion and ok status
        if (this.readyState == 4 && this.status == 200) {
            // create an object and parse the JSON file
            var rdiObj = JSON.parse(this.responseText);

            // Create a Header
            var txt = "<h2>" + rdiObj.game + "</h2>";

            // loop through the object getting all the properties to display
            for (var version in rdiObj.versions) {
                txt += "<table><tr><th>" + rdiObj.versions[version].version + "</th></tr>";
                txt += "<tr><th>Name</th><th>Race</th><th>Class</th><th>The Good</th><th>The Bad</th><th>The Worse</th></tr>";

                // loop through the object getting all the characters to display
                for (var character in rdiObj.versions[version].characters) {
                    txt += "<tr><td>" + rdiObj.versions[version].characters[character].name + "</td><td>" +
                        rdiObj.versions[version].characters[character].race + "</td><td>" +
                        rdiObj.versions[version].characters[character].class + "</td><td>" +
                        rdiObj.versions[version].characters[character].good + "</td><td>" +
                        rdiObj.versions[version].characters[character].bad + "</td><td>" +
                        rdiObj.versions[version].characters[character].worse + "</td></tr>";
                }
            }
            
            // display the data from the JSON file in a nice format
            document.getElementById("rdiDisplay").innerHTML = txt;
        }
    }
    xmlhttp.open("GET", "rdi.json", true);
    xmlhttp.send();
}