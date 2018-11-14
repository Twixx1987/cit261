// a function to initialize the canvas
function drawCanvas() {
    // get the canvas element
    let canvas = document.getElementById("canvas");

    // get the canvas context
    let context = canvas.getContext("2d");

    // create a gradient
    let gradient = context.createLinearGradient(0, 0, 420, 360);
    gradient.addColorStop(0, "#006600");
    gradient.addColorStop(1, "#0033cc");

    // create some designs on the canvas
    context.fillStyle = gradient;
    context.fillRect(0, 0, 420, 360);
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = "white";
    context.fill();
}