/******************************************************************
* The following menu code comes from W3Schools.com
* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav
******************************************************************/
function menuToggle() {
    // get the menu
    let x = document.getElementById("menu");

    // set the menus classes based on current classes
    if (x.className === "menu") {
        // add responsive
        x.className += " responsive";
    } else {
        // reset to menu only
        x.className = "menu";
    }
}

/******************************************************************
* The following menu code comes from W3Schools.com
* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs
******************************************************************/
function switchTab(evt, tabName) {
    // initialize variables
    let i, tabcontent, tablinks;

    // remove all tabs from display
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // get the tab that was clicked and display it
    document.getElementById(tabName).style.display = "block";

    // set the current tab button to active
    evt.currentTarget.className += " active";
}


/******************************************************************
* A function to add player name inputs to the form
******************************************************************/
function listPlayers() {

}