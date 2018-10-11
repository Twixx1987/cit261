// add the list of majors to the form
function populateMajors() {
    // create the majors array
    var majors = ["Computer Engineering", "Computer Information Technology", "Computer Science", "Software Engineering", "Web Design and Development"];

    // loop through the array adding each major as a radio button to the form
    for (var i = 0; i < majors.length; i++) {
        // create the child list item element
        var listItem = document.createElement("li");

        // create the radio button element
        var radio = document.createElement("input");
        radio.setAttribute("name", "major");
        radio.setAttribute("id", majors[i]);
        radio.setAttribute("value", majors[i]);
        radio.setAttribute("type", "radio");

        // create the label element
        var label = document.createElement("label");
        label.setAttribute("for", majors[i]);

        // create the label text
        var labelText = document.createTextNode(majors[i]);

        // add all the parts
        label.appendChild(labelText);
        listItem.appendChild(radio);
        listItem.appendChild(label);
        document.getElementById("majors").appendChild(listItem);
    }
}

// a function to generate a JS object
function generateObject() {
    // gather the value of each element
    var name = document.getElementById("javascriptObjectData").elements.namedItem("name").value;
    var age = document.getElementById("javascriptObjectData").elements.namedItem("age").value;
    var major = document.getElementById("javascriptObjectData").elements.namedItem("major").value;

    // remove whitespace
    name = name.trim();
    age = age.trim();

    // clean the data
    var nameCheck = name.search(/^[a-zA-Z]+(\s[a-zA-Z]*)*$/);
    var ageCheck = age.search(/^[0-9]+$/);

    // check that the data is well formatted
    if (nameCheck == 0 && ageCheck == 0) {
        // create the object
        var you = {
            name: name,
            age: age,
            get showContent() {
                return "Your name: " + this.name + "<br />Your age: " + this.age + "<br />Your major: " + this.major;
            }
        };

        // add a property to the object
        you.major = major;

        // add methods to the object
        you.showObject = function () {
            return "{ name: " + name + ", age: " + age + ", major: " + major + "}<br />";
        };

        // replace element with the object details
        document.getElementById("objectResults").innerHTML = you.showObject() + you.showContent;
    } else {
        // replace element with error
        document.getElementById("objectResults").innerHTML = "Input data is malformed, ensure that"
            + " your name contains only alpha characters and your age is a numeric value.";
    }
}

// a method to generate some objects
function generateMultiple() {
    // create five Description objects
    var desc1 = new Description("2-4", "13+", "60 minutes", "You are working together to stop the viral spread from destroying the planet.");
    var desc2 = new Description("2-5", "8+", "15 minutes", "See who can score the highest in this game of math and strategy.");
    var desc3 = new Description("2-4", "13+", "30-60 minutes", "Become the last adventurer standing. Gamble your cohort out of their money or drink them under the table.");
    var desc4 = new Description("2-5", "8+", "30-60 minutes", "Build settlements, build highways, harvest resources, and build an army. Whoever amasses the most points wins.");
    var desc5 = new Description("5-10", "13+", "30 minutes", "Work as a member of the resistance to bring freedom or work as a spy to stop the revolution.");

    // create five Game objects
    var game1 = new Game("Pandemic", "ZMan Games", desc1);
    var game2 = new Game("Qwixx", "GameWright", desc2);
    var game3 = new Game("Red Dragon Inn", "Slugfest Games", desc3);
    var game4 = new Game("Settlers of Catan", "Mayfair Games", desc4);
    var game5 = new Game("The Resistance", "Indie Boards & Cards", desc5);

    // create a text variable to display the contents of the objects
    var text = "game1: {" + game1.showContent() + "}<br />";
    text += "game2: {" + game2.showContent() + "}<br />";
    text += "game3: {" + game3.showContent() + "}<br />";
    text += "game4: {" + game4.showContent() + "}<br />";
    text += "game5: {" + game5.showContent() + "}<br />";

    // get the element to display the content
    var objectsDiv = document.getElementById("multipleObjects");

    // display the games components
    objectsDiv.innerHTML = text;

    // display the div that has the content
    objectsDiv.style.display = "block";
}

// a class to contain the details of a board game
function Game(name, manufacturer, description) {
    // object initialization
    this.name = name;
    this.manufacturer = manufacturer;
    this.description = description;
}

// prototype method creation
Game.prototype.showContent = function () {
    // return the contents of the object
    return "name: " + this.name + ", manufacturer: " + this.manufacturer + ", description: " + this.description.showContent();
}

// a class to contain the details of a description
function Description(players, ages, time, summary) {
    // object initialize
    this.players = players;
    this.ages = ages;
    this.time = time;
    this.summary = summary;
}

// prototype method creation
Description.prototype.showContent = function () {
    // return the contents of the object
    return "{ players: " + this.players + ", ages: " + this.ages + ", time: " + this.time + ", summary: " + this.summary  + "}";
}