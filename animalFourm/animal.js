let animals = [
    {
        type: "cat",
        strength: 10,
        charisma: 16, 
    },
    {
        type: "dog",
        strength: 14,
        charisma: 9, 
    },
    {
        type: "rabbit",
        strength: 7,
        charisma: 12, 
    },
    {
        type: "sea horse",
        strength: 2,
        charisma: 20, 
    },
];

document.addEventListener("DOMContentLoaded", populateAnimalDiv);

function populateAnimalDiv() {
    let animalInfoDiv = document.querySelector('#all-animal-info');

    animalInfoDiv.innerHTML = "";

    // for (let i = 0; i < animals.length; i++) {
    //     let animal = animals[i];
    // }
    //or 

    for (let animal of animals) {
        let animalHTML = createAnimalDiv(animal);
        animalInfoDiv.innerHTML += animalHTML;

    }

}

function createAnimalDiv(animal) {
    return `
        <div>
            <h1>${animal.type}<h1>
            <div class='stats'>
                <div>strength: ${animal.strength}</div>
                <div>charisma: ${animal.charisma}</div>
            </div>

        </div>
    `;
    
}


let addAnimalForm = document.querySelector("#add-animal-form");
addAnimalForm.addEventListener("submit", addNewAnimal);

function addNewAnimal(e) {
    e.preventDefault();

    let typeInput = document.querySelector("#animal-type-feild").value;
    let strengthInput = document.querySelector("#animal-strength-feild").value;
    let charismaInput = document.querySelector("#animal-charisma-feild").value;

    let newAnimal =  {
        type:typeInput,
        strength: strengthInput,
        charisma: charismaInput
    }
    animals.push(newAnimal);
    populateAnimalDiv();
}
