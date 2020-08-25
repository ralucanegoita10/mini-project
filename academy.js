
const globalBoard = [[null, null, null], [null, null, null], [null, null, null]];
let playerCount = 0;
let gameCount = 1;

// Make your changes to store and update game state in this file

// Take the row and column number between 0 and 2 
// (inclusive) and update the game state.
function takeTurn(row, column) {
    console.log("takeTurn was called with row: "+row+", column:"+column);

    if (playerCount > 8 || checkWinner() !== null)
      resetGame();

    // check if space is taken
    if( globalBoard[row][column] !== null)
    {
        console.log("this place is taken");
        return null;
    }

    // if space is available
    if (playerCount % 2 === 0)
      globalBoard[row][column] = 'nought'
    else
      globalBoard[row][column] = 'cross'

    playerCount += 1;    
    
}

function checkDiagonal1(board) {
    let diag1 = true;
    for (let i=board.length-1; i>0; i--)
    {
        if (board[i][board.length-1-i] !== board[i-1][board.length-i])
            diag1 = false;
    }
    if (diag1 === true)
    {
        if (board[board.length-1][0] === 'nought')
            return "noughts";

        else if (board[board.length-1][0] === 'cross')
            return "crosses";
    }       
    return null;
}

function checkDiagonal2(board)
{
    let diag2 = true;
    for (let i=0; i<board.length-1; i++)
    {
        if (board[i][i] !== board[i+1][i+1])
            diag2 = false;
    }
    if (diag2 === true)
    {
        if (board[0][0] === 'nought')
            return "noughts";

        else if (board[0][0] === 'cross')
            return "crosses";
    }   
    
    return null;
}

function checkRow(board) {
    for (let i=0; i<board.length; i++)
    {
        let rows = true;
        for (let j=0; j<board.length-1; j++)
        { 
            if (board[i][j] !== board[i][j+1])
                rows = false;
        }
        if (rows === true)
        {
            if (board[i][0] === 'nought')
                return "noughts";

            else if (board[i][0] === 'cross')
                return "crosses";
        }       
    }
    return null;
}


function checkColumns(board)
{
    // for loop for columns
    for (let i=0; i<board.length; i++)
    {
        let columns = true;

        for (let j=0; j<board.length-1; j++)
        { 
            if (board[j][i] !== board[j+1][i])
                columns = false;
        }
        
        if (columns === true) 
        {
            if (board[0][i] === 'nought')
                return "noughts";

            else if (board[0][i] ==='cross')
                return "crosses";
        }
    }

    return null;
}

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {   
    console.log("checkWinner was called");

    const board = getBoard();

    let diagWin = checkDiagonal1(board);
    if (diagWin !== null) return diagWin;

    diagWin = checkDiagonal2(board);
    if (diagWin !== null) return diagWin;

    const rowWin = checkRow(board);
    if (rowWin !== null) return rowWin;

    const colWin = checkColumns(board);
    if( colWin !== null) return colWin;

    if (playerCount > 8)    
        return "nobody";
    else
        return null;
}

// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    
    playerCount = 0;

    for (i=0; i<globalBoard.length; i++)
        for (j=0; j<globalBoard.length; j++)
            globalBoard[i][j] = null;

    return globalBoard;
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    
    return globalBoard;
}

module = module || {};
module.exports = {
    takeTurn: takeTurn,
    checkWinner: checkWinner,
    resetGame: resetGame,
    getBoard: getBoard,
}