function resetStorage() {
    // reset the sessionStorage
    sessionStorage.clickCount = 1;
}

function startStory() {
    // initialize count
    let count = 0;

    // get the click count
    if (sessionStorage.clickCount) {
        count = sessionStorage.clickCount++;
    } else {
        count = 1;
        sessionStorage.clickCount = count;
    }

    // pick which function to call based on what the click count is.
    switch (count) {
        case 1:
            part1();
            break;
        case 2:
            part2();
            break;
        case 3:
            part3();
            break;
        case 4:
            part4();
            break;
        case 5:
            part5();
            break;
        case 6:
            part6();
            break;
        case 7:
            part7();
            break;
        default:
            reset();
    }
}

function updateCount() {
    // get the element
    let element = document.getElementById("clickCount");

    // set the content based on the session storage value
    element.innerHTML = sessionStorage.clickCount - 1;
}

function part1() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Transform?";
    start.style.color = "#f2f2f2";
    start.style.backgroundColor = "#0d0d0d";

    // the next part of the story
    let text = "The HTML warrior began a transformative journey through the internet.";

    // update the story text
    document.getElementById("demoText").innerHTML = text; 

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}

function part2() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Color?";
    start.style.color = "#e6e6e6";
    start.style.backgroundColor = "#1a1a1a";

    // the next part of the story
    let text = "He encountered a rotation transform that made it hard to see so he turned back.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.transform = "rotate(90deg)";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}

function part3() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Border?";
    start.style.color = "#d9d9d9";
    start.style.backgroundColor = "#262626";

    // the next part of the story
    let text = "He found what looked like a cool color pallet but was really contrasting.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.transform = "rotate(0deg)";
    demoText.style.color = "yellow";
    demoText.style.backgroundColor = "red";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}
function part4() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Scale?";
    start.style.color = "#cccccc";
    start.style.backgroundColor = "#333333";

    // the next part of the story
    let text = "After fixing his color the border crashed down on him.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.color = "darkblue";
    demoText.style.backgroundColor = "lightblue";
    demoText.style.border = "thick solid green";
    demoText.style.padding = "1px";
    demoText.style.width = "100px";
    demoText.style.height = "100px";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}
function part5() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Fade?";
    start.style.color = "#d9d9d9";
    start.style.backgroundColor = "#262626";

    // the next part of the story
    let text = "Luckily, he found a way to push that border away.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.border = "thin solid black";
    demoText.style.padding = "150px";
    demoText.style.width = "600px";
    demoText.style.height = "600px";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}
function part6() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Reset?";
    start.style.color = "#e6e6e6";
    start.style.backgroundColor = "#1a1a1a";

    // the next part of the story
    let text = "But in escaping he began to fade.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.width = "300px";
    demoText.style.height = "300px";
    demoText.style.border = "none";
    demoText.style.padding = "25px";
    demoText.style.opacity = ".25";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}
function part7() {
    // update the count display
    updateCount();

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Start Over?";
    start.style.color = "#f2f2f2";
    start.style.backgroundColor = "#0d0d0d";

    // the next part of the story
    let text = "To avoid fading entirely he ran back to where he started.";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the display of the text
    demoText.style.width = "300px";
    demoText.style.border = "none";
    demoText.style.padding = "25px";
    demoText.style.opacity = "1";
    demoText.style.color = "black";
    demoText.style.backgroundColor = "white";

    // change the display of demo outer
    let demoOuter = document.getElementById("demoOuter");
    demoOuter.style.display = "block";
}
function reset() {
    // update the count display
    updateCount();

    // call reset storage to clear the session storage value
    resetStorage();

    // the next part of the story
    let text = "Begin the story anew?";

    // update the story text
    let demoText = document.getElementById("demoText");
    demoText.innerHTML = text;

    // change the content of the start button
    let start = document.getElementById("start");
    start.innerHTML = "Start";
    start.style.color = "#ffffff";
    start.style.backgroundColor = "#000000";
}