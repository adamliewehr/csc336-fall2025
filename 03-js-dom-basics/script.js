
console.log('hello');

let demoBoxes = document.getElementsByClassName("demo-box");

console.log(demoBoxes.length);

let clickCount = 0;

function clickedOnDemoBox() {

    clickCount++;
    let topAreaDiv = document.getElementById('top-area');
    topAreaDiv.innerText = clickCount;
}

function getRandomNumRGB() {


    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}

function changeBackgroundColor() {


    document.body.style.backgroundColor = `rgb(${getRandomNumRGB()}, ${getRandomNumRGB()}, ${getRandomNumRGB()})`;
}

function jumpscareButton() {
    // Create the fullscreen overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('fullscreen-overlay');

    // Create the image element for the GIF
    const gif = document.createElement('img');
    gif.src = 'secret.gif'; // Replace with the path to your GIF

    const sound = new Audio('sound.mp3'); // Replace with the path to your sound file


    // Append the GIF to the overlay
    overlay.appendChild(gif);

    // Append the overlay to the body to make it visible
    document.body.appendChild(overlay);

    sound.play()
}

let degrees = 0


function rotateMazie() {
    degrees+=20;

    let mazieImage = document.getElementById('mazie');
    mazieImage.style.transform = `rotate(${degrees}deg)`;
    
    


}

function firstButton() {
    document.getElementById('secondButton').style.visibility = 'visible';
}
function secondButton() {
    document.getElementById('jumpscare').style.visibility = 'visible';
}