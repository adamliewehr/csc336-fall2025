let person = {
    name: "Adam",
    favoritePetIsCat: true,
    hello: function(n) {
        for (let i =0; i<n; i++) {
            console.log(i)
        }
    },
    favoritePet: {
        name: 'Phoony',
        species: 'cat'

    }
}

person.hello(10);
console.log(person.favoritePet.name);

// redefine object attributes
person.favoritePet.name = 'Bonnie';
console.log(person.favoritePet.name);



let nums = [1, 2, 3, 4, 5]

for (num in nums) {
    console.log(num);
}

console.log(document)


// real code starts here

function rollDice() {
    let randomNumber = Math.ceil(Math.random() * 6);
    
    let diceRollDiv = document.querySelector('#dice-roll-image');
    let diceRollNum = document.querySelector('#dice-roll');
    diceRollNum.innerHTML = "<div id='dice-roll'>" + randomNumber + "</div>";

    // console.log(randomNumber);
    
    if (randomNumber == 1) {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceOne.png'></img>";
    }
    else if (randomNumber == 2) {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceTwo.png'></img>";

    }
    else if (randomNumber == 3) {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceThree.png'></img>";

    }
    else if (randomNumber == 4) {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceFour.png'></img>";

    }
    else if (randomNumber == 5) {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceFive.png'></img>";

    }
    else {
        diceRollDiv.innerHTML = "<img id='dice-roll-image'; src='diceSix.png'></img>";

    }



    // let newRollDiv = document.createElement("div");
    // newRollDiv.innerText = randomNumber;
    // newRollDiv.className = 'dice-roll';
    // diceRollDiv.append(newRollDiv);

}