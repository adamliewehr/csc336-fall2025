
console.log('hello');

let demoBoxes = document.getElementsByClassName("demo-box");

console.log(demoBoxes.length);

let clickCount = 0;

function clickedOnDemoBox() {
    console.log("click");
    clickCount++;
    let topAreaDiv = document.getElementById('top-area');
    topAreaDiv.innerText = clickCount;
}