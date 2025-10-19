import express from "express";
import fs from "fs";

// creating an instance of the express server
const app = express();

app.use(express.static("./public"));
app.use(express.json());



app.listen(3000, () => console.log("Server running on http://localhost:3000"));



app.get("/world", async (req, res) => {
    // Read in the data, parse it into an object and send it over as json to the client
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject);
});


app.post("/changePossession", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.
    const world = JSON.parse(worldData);

    // req.body is the json object sent to us from the client. 
    // NOTE: it was parsed automatically by express (that's what the app.use(express.json()); does above)
    const personToGiveRingTo = req.body;

    for (const region of world.regions) {
        // console.log(region.name);
        for (const town of region.towns) {
            // console.log(town.name);
            for (const people of town.noteable_people) {
                if (people.name === personToGiveRingTo.name) {
                    people.items.push({
                                    "name": "The One Ring",
                                    "rarity": "legendary"
                                });
                    console.log("the ring was given to someone new!");
                }
                // console.log(people.name);
                for (const item of people.items) {
                    if (item.name == "The One Ring" && people.name != personToGiveRingTo.name) {
                        people.items.splice(people.items.indexOf({"name": "The One Ring","rarity": "legendary"}), 1);
                        
                    
                    } 
                }
            }
        }
    }
    
    

    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});