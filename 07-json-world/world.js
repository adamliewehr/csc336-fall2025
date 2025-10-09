import fs from 'fs';

const data = fs.readFileSync('world.json', 'utf-8');

const regions = JSON.parse(data);

console.log("------All legendary items in all regions owened by whom------")

for (const region of regions.regions) {
    // console.log(region.name);
    for (const town of region.towns) {
        // console.log(town.name);
        for (const people of town.noteable_people) {
            // console.log(people.name);
            for (const item of people.items) {
                if (item.rarity == "legendary") {
                    console.log(`${people.name} owns ${item.name}.`);
                }
            }
        }
    }
}