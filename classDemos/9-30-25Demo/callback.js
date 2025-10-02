let button = document.querySelector("#callbackDemoButton");

// function clickEventHappened(e) {
//     console.log("Clicked");
// }
// button.addEventListener("click", clickEventHappened);


// button.addEventListener("click", (e) => {console.log("Clicked!")}); // arrow functions

button.addEventListener("click", e => console.log("Clicked!")); // single parameter arrow functions


// function doSomething(numTimes) {
//     let sum= 0 ;
//     for (let i = 0; i < numTimes; i++) {
//         sum += i * numTimes / 4;
//     }
//     return sum;
// }

// let result = doSomething(100);

// console.log(result);

// https://dog.ceo/api/breeds/image/random

let dogRequest = fetch("https://dog.ceo/api/breeds/image/random");


dogRequest
    .then((dogResponse) => { return dogResponse.json() })
    .then((dogData) => {
        console.log(dogData);
        let dogImageHTML = document.createElement("img");
        dogImageHTML.width = 500;
        dogImageHTML.src = dogData.message;
        document.querySelector("body").appendChild(dogImageHTML);

    })
    .catch(() => console.log("something went wrong"));



// async function getAndDisplayDogImage() {
//     let before = Date.now();
//     let dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
//     let dogData = await dogResponse.json();

//     let timePassed = Date.now() - before;
//     console.log(`It took ${timePassed} for this request.`)
//     console.log(dogData);
//     let dogImageHTML = document.createElement("img");
//     dogImageHTML.width = 500;
//     dogImageHTML.src = dogData.message;
//     document.querySelector("body").appendChild(dogImageHTML);
// }

// for (let i = 0; i < 5; i++) {
//     getAndDisplayDogImage();


// }


// https://api.chucknorris.io/jokes/random

// let request = fetch("https://api.chucknorris.io/jokes/random");

// request
//     .then(response => { return response.json() })
//     .then(data => { return data });


async function getAndDisplaySomething() {
    let response = await fetch("https://api.chucknorris.io/jokes/random");
    let data = await response.json();

    let putIntoHTML = document.createElement("p");
    document.querySelector("body").appendChild()
}

getAndDisplaySomething();
