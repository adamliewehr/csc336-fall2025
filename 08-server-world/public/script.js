let data;

let people = {};

async function loadWorld() {
    const res = await fetch("/world");
    data = await res.json();

    document.getElementById("worldDiv").innerHTML =
        `<ol id="listOfPeople"></ol>`;

    for (const region of data.regions) {
        // console.log(region.name);
        for (const town of region.towns) {
            // console.log(town.name);
            for (const people of town.noteable_people) {
                document.getElementById("listOfAllPeople").innerHTML +=
                        `<li>${people.name}</li>`;
                for (const item of people.items) {
                    if (item.name == "The One Ring") {
                        document.getElementById("listOfPeople").innerHTML +=
                        `<li>${people.name} has ${item.name}</li>`;
                    } 
                }
            }
        }
    }



    
}

// This function will run when the script is loaded
// loadWorld();


oneRingForm.addEventListener("submit", async (e) => {
    // e.preventDefault(); // wouldn't you want it to refresh?

    // FormData is a utility class that helps us access the data inside of forms
    // without needing to manually call 'document.querySelector' or for every input
    // in the form. After these two lines, we will have a single javascript object
    // where the keys are the "name" field of each input, and the values are the 
    // value of each input (e.g. the text written into a text input).
    let formData = new FormData(oneRingForm);
    let formDataInObjectForm = Object.fromEntries(formData.entries());

    // Tell the server to add excitement to a 
    const res = await fetch("/changePossession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataInObjectForm)
    });

    const updatedWorld = await res.json();
    // document.getElementById("worldDiv").innerHTML =
    //     `<ul><li>${updatedWorld.regions[0].towns[0].notable_people[0].name}</li></ul>`;
    loadWorld();
});

async function setup () {
    createCanvas(800, 800);
    colorMode(HSB);

    await loadWorld();

    for (let region of data.regions) {
        // console.log(region.name);
        for (let town of region.towns) {
            for (let person of town.noteable_people) {
                people[person.name] = new Person(person);
            }
        }
    }
}

function draw () {
    background(frameCount%360, 100, 100);
    stroke(0);
    strokeWeight(10);
    noFill();
    rect(0, 0, width, height);

    for (let name in people) {
        let person = people[name];

        if (dist(mouseX, mouseY, person.x, person.y) < person.radius) {
            person.hover = true;
        } else {
            person.hover = false;
        }


        person.update();
    }




}