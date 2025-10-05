
let deckRequest = fetch("https://deckofcardsapi.com/api/deck/new/");

let deckID;

// sets up the game
deckRequest
    .then((deckResponse) => { return deckResponse.json() })
    .then((deckData) => {
        deckID = deckData.deck_id;
        // console.log(deckID);
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=true`);
        deal();
    })
    .catch(() => console.log("something went wrong"));

// back of the card image
let backImageRequest = fetch("https://deckofcardsapi.com/static/img/back.png");

// console.log(backImageRequest);

let imageURL;

backImageRequest
    .then((backResponse) => { return backResponse.blob() })
    .then((backData) => {
        imageURL = URL.createObjectURL(backData);

    })
    .catch(() => console.log("something went wrong with the back image"));

// for displaying the back of the card! --------
// let imgElement = document.createElement('img');
//         imgElement.src = imageURL;
//         document.body.appendChild(imgElement);


// shuffling --------
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/

let values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

let player1Hand;
let player2Hand;

let player1Down = [];
let player2Down = [];

let table = []; // player 1 cards gets pushed first, then player 2

async function displayPlayer1Card() {

    // attributes for card Ace of Spades: 
    // code: AS
    // image: url to image
    // value: ACE
    // suit: SPADES
    // console.log(player1Hand[0]);

    player1Down.push(player1Hand.pop());


    let cardElement = document.createElement("img");
    cardElement.width = 90;

    cardElement.src = player1Down[player1Down.length - 1].image;
    document.querySelector(".player1-card-placeholder").appendChild(cardElement);

    console.log(player1Down[player1Down.length - 1]);

    updateCounts();

}

async function displayPlayer2Card() {

    player2Down.push(player2Hand.pop());


    let cardElement = document.createElement("img");
    cardElement.width = 90;

    cardElement.src = player2Down[player2Down.length - 1].image;
    document.querySelector(".player2-card-placeholder").appendChild(cardElement);

    console.log(player2Down[player2Down.length - 1]);

    updateCounts();

}


function fight() {

    player1Value = values.indexOf(player1Down[player1Down.length - 1].value);
    player2Value = values.indexOf(player2Down[player2Down.length - 1].value);

    if (player1Value > player2Value) {
        player1Wins();

    }
    else if (player1Value < player2Value) {
        player2Wins();

    }
    else {
        console.log("war!");
    }

    updateCounts();


}


function player1Wins() {
    for (card in player1Down) {
        player1Hand.splice(0, 0, player1Down.pop());
    }
    for (card in player2Down) {
        player1Hand.splice(0, 0, player2Down.pop());
    }

    document.querySelector(".player1-card-placeholder").innerHTML = "";
    document.querySelector(".player2-card-placeholder").innerHTML = "";


}

function player2Wins() {
    for (card in player1Down) {
        player2Hand.splice(0, 0, player1Down.pop());
    }
    for (card in player2Down) {
        player2Hand.splice(0, 0, player2Down.pop());
    }

    document.querySelector(".player1-card-placeholder").innerHTML = "";
    document.querySelector(".player2-card-placeholder").innerHTML = "";

}

function war() {



}



async function deal() {

    let player1Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=26`);
    let player1StartingHand = await player1Response.json();

    player1Hand = player1StartingHand.cards
    console.log(player1Hand);

    let player2Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=26`);
    let player2StartingHand = await player2Response.json();

    player2Hand = player2StartingHand.cards;
    console.log(player1Hand);

    updateCounts();

}

function updateCounts() {

    document.querySelector(".player1Count").innerHTML = `<p id = "count" class="player1Count">Cards: ${player1Hand.length}</p>`
    document.querySelector(".player2Count").innerHTML = `<p id = "count" class="player2Count">Cards: ${player2Hand.length}</p>`

}




let player1Card = document.querySelector("#player1Button");
player1Card.addEventListener('click', displayPlayer1Card);


let player2Card = document.querySelector("#player2Button");
player2Card.addEventListener('click', displayPlayer2Card);

let fightButton = document.querySelector("#fight");
fightButton.addEventListener('click', fight);

// let dealButton = document.querySelector("#deal");
// dealButton.addEventListener('click', deal);











// second API ------------------------------------------------------------

async function advice() {
    // let adviceElement = document.createElement("p");

    try {
        let response = await fetch(`https://api.adviceslip.com/advice/${Math.random() * 150}`);
        data = await response.json();

        // console.log(data.slip.id);
        // adviceElement.innerHTML = data.slip.advice;
        document.querySelector(".adviceArea").innerHTML = `<p>${data.slip.advice}</p>`;

    }
    catch {
        // console.log('SOMETHING WENT WRONG');
        // adviceElement.innerHTML = 'Ease into things.';
        document.querySelector(".adviceArea").innerHTML = `<p>Ease into things.</p>`;
    }

}

let adviceButton = document.querySelector("#advice");
adviceButton.addEventListener('click', advice);