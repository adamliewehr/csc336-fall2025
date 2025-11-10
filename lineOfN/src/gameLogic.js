import { writeFile } from 'fs/promises';


let uniqueTTProducts = []; // TODO: need to add this
// or write a algorithm to calculate the numbers for me (do this)

let numOfRows = 6;
let numOfCols = 6;

let gameBoard = [];
// let playerTokenPlacemenBoard = [];

// populating the gameBoard (testing purposes)
// real game board population will use unique times tables products
let count = 0;
for (let i = 0; i<numOfRows; i++) {

    let currentRow = []
    let currentRowGameBoard = [];
    let currentRowToken = [];
    for (let j = 0; j<numOfCols; j++) {

        currentRow.push({
            number: count,
            playerTokenPlacement: 0

        });
        // currentRowGameBoard.push(count); // currently doing this so I can test the slicing
        count++;
        // currentRowToken.push(0); // playerTokenPlacemenBoard will be initilized with all 0s to start
    }
    gameBoard.push(currentRow);
    // playerTokenPlacemenBoard.push(currentRowToken);

}

const jsonString = JSON.stringify(gameBoard, null, 2);

await writeFile('src/gameBoard.json', jsonString, 'utf-8');
console.log('File saved.');

// console.log(gameBoard);
// console.log(playerTokenPlacemenBoard);

// Algo to check for line of four
// horizontal, vertial, and diagonal

// make a list of every group of 4 and then make a set and see if the length is 1 or 2?
// player 1 can be 1 on the game board, and player 2 can be 2 on the game board
// if length is 1, and that set contains anything but a 0, a player has a line of four

// This could also be line of "n"
// game could be more custom, where the players choose the number of tokens in a line needed to win 
// and the size of the grid (n by m)

let n = 4;

let rows = [];
let columns = [];
let diagonals = [];


// rows (sliding window)
for (let row of gameBoard) {
    for (let i = 0; i<row.length-n+1; i++) {
        rows.push(row.slice(i,i+n));

    }
}


// columns 
// game board will always be a rect

let transposedBoard = [] // making all the rows the columns, so we can search for lines of n
for (let i = 0; i < gameBoard[0].length; i++) {
    let current = [];

    for (let j = 0; j< gameBoard.length; j++) {
        current.push(gameBoard[j][i]);
    }

    transposedBoard.push(current);

}

// now we can do the same sliding window on the transposed board to get the columns
for (let row of transposedBoard) {
    for (let i = 0; i<row.length-n+1; i++) {
        columns.push(row.slice(i,i+n));
    }
}

// diagonals
// there are two directions for diagonals
// left to right downward slope
// right to left downward slope

// left to right downward slope
for (let i = 0; i<gameBoard.length - n + 1; i++) {
    for (let j = 0; j<gameBoard[0].length - n + 1; j++) {
        let currentDiagonal = [];
        for (let k = 0; k<n; k++) {
            currentDiagonal.push(gameBoard[i+k][j+k]);
        }
        diagonals.push(currentDiagonal);
    }
}

// Explanation:
// The left-to-right downward slope diagonals are found by iterating over the game board
// and collecting elements where the row and column indices increase together.


// right to left downward slope
for (let i = 0; i<gameBoard.length - n + 1; i++) {
    for (let j = n - 1; j<gameBoard[0].length; j++) {
        let currentDiagonal = [];
        for (let k = 0; k<n; k++) {
            currentDiagonal.push(gameBoard[i+k][j-k]);
        }
        diagonals.push(currentDiagonal);
    }
}

// now we have all the rows, columns, and diagonals stored in their respective arrays
// we can now check each array for a line of n for either player

