// This file contains helper code beyond the first week "Intro to JavaScript" course content.
// You should not have to make any changes in this file to get your game working.

// Validate academite functions are available
const functions = ["takeTurn", "getBoard", "checkWinner", "resetGame"];
for (f of functions) {
    const functionObject = window[f];
    if (typeof functionObject !== "function") {
        throw "Looks like expected function '" + f + "' is missing. Double check the function signatures from academy.js are still present and unaltered.";
    }
}

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById("row-"+i+"-column-"+j).innerHTML = ""
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) {
    clearBoard();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                continue;
            }
            document.getElementById("row-"+i+"-column-"+j).innerText = board[i][j] === "nought" ? "⭕" : "❌";
        }
    }
}

function isValidRowOrColumn(array) {
    return Array.isArray(array) && array.length === 3;
}

function isValidColumn(col) {
    return isValidRowOrColumn(col) && col.every(function (item) { return ["nought", "cross", null].includes(item); });
}

// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(row, column, event) {
    takeTurn(row, column);
    const board = getBoard();
    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'nought' or 'cross'. Actually received: " + JSON.stringify(board);
    }
    drawBoard(board);
    const winner = checkWinner();
    if (winner) {
        if (typeof winner !== "string" || !["noughts", "crosses", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'noughts', 'crosses' or 'nobody'. Actually received: " + winner;
        }

        // Add to winning statement based on game count
        let gameStatement = ". There ha"
        gameStatement += gameCount === 1 ? "s been " + gameCount + " game." : "ve been " + gameCount + " games."

        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = winner + gameStatement;
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "block";
        gameCount += 1;
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard();
}

// Bind the click events for the grid.
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const gridPosition = document.getElementById("row-"+i+"-column-"+j);
        gridPosition.addEventListener("click", positionClick.bind(null, i, j));
    }
}

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);
