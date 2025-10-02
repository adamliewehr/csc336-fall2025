
let deckRequest = fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

let deckID;

deckRequest
    .then((deckResponse) => { return deckResponse.json() })
    .then((deckData) => {
        deckID = deckData.deck_id;
    })
    .catch(() => console.log("something went wrong"));

async function displayCard() {

    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    let CardData = await response.json();

    // console.log(CardData.cards[0].image);

    let cardElement = document.createElement("img");

    cardElement.src = CardData.cards[0].image;
    document.querySelector("body").appendChild(cardElement);

}

async function advice() {
    
    let response = await fetch("https://api.adviceslip.com/advice");
    data = await response.json();


    console.log(data.slip.advice);



}


let card = document.querySelector("#testButton");
card.addEventListener('click', displayCard);


let adviceButton = document.querySelector("#advice");
adviceButton.addEventListener('click', advice);