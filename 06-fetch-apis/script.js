let data;

async function shuffleCards() {
    
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    data = await response.json();


    // console.log(data);

    let elementInHTML = document.createElement("p");

    elementInHTML.innerHTML = data.deck_id;
    document.querySelector("body").appendChild(elementInHTML);

    let secondResponse = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
    let CardData = await secondResponse.json();


    console.log(CardData.cards[0].image);

    let cardElement = document.createElement("img");

    cardElement.src = CardData.cards[0].image;
    document.querySelector("body").appendChild(cardElement);




}



async function drawCard() {
    
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`);
    let CardData = await response.json();


    console.log(CardData);

    // let elementInHTML = document.createElement("p");

    // elementInHTML.innerHTML = data.deck_id;
    // document.querySelector("body").appendChild(elementInHTML);
}

shuffleCards();
drawCard();