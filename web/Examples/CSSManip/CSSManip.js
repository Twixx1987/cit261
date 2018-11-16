// JavaScript source code
function startStory() {
    // create session storage and set the count to 1
    sessionStorage.clickCount = 1;

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Transform?";
    start.style.color = "#0033cc";
    start.style.backgroundColor = "#ffff66";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = block;
}

function part1() {

}