const fs = require("fs"); // import library using "CommonJS"

let programCount = 0;

try {
    let fileContents = fs.readFileSync("program_count.txt", "utf-8");
    programCount = JSON.parse(fileContents);

} catch (error) {
    console.log("Error Happened! probably file doesn't exist maybe");

}

programCount++;
console.log(fileContents);
fs.writeFileSync("program_count.txt", JSON.stringify(programCount));
