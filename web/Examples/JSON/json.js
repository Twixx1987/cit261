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

            // loop through the object getting all the properties to display

            // display the data from the JSON file in a nice format
            document.getElementById("rdiDisplay").innerHTML = this.responseText;

        }
    }
    xmlhttp.open("GET", "rdi.json", true);
    xmlhttp.send();
}