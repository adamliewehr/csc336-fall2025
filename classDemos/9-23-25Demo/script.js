// Classes --------

class Person {
    constructor(n) {
        this.name = n;

    }

    sayHello(howManyTimes) {
        for (let i = 0; i < howManyTimes; i++) {
            console.log(`Hello, my name is ${this.name}`);
        }


    }



}

// Instantiating an object from a class --------
let adam = new Person("Adam");
adam.sayHello(5);


// JSON: JavaScript Object Notation

let stringVersonOfAdam = JSON.stringify(adam);
console.log(stringVersonOfAdam);

let adamObject = JSON.parse(stringVersonOfAdam);
console.log(adamObject.name);









// local storage - mini cache --------
console.log(localStorage.getItem("user"));
localStorage.setItem("user", "adam" + Math.random());












// arrow functions --------

let add2 = (a, b) => {
    return a + b;
}

// why tho?
// they are useful for writing functions faster and easier
// also has something to do with the key word 'this'

// function buttonClicked(e) {
//     console.log("You clicked me!");
//     console.log(e);
// }


let myButton = document.querySelector("#myButton");

    const canvas = document.querySelector("#myCanvas");
    console.log(canvas);

    const ctx = canvas.getContext('2d');



let x = 300;
let y = 200;

let dx=0;
let dy=0;

myButton.addEventListener("click", (e) => {
    console.log("You clicked me!");
    console.log(this);

    dx = (Math.random()*2)-1;
    dy = (Math.random()*2)-1;

});

function animationFunction() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 400)
    x+=dx;
    y+=dy;

    ctx.fillStyle = '#9e3b3bff';


    ctx.fillRect(x, y, 50, 50);

}


setInterval(animationFunction, 10);

