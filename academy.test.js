const each = require("jest-each").default;
const { takeTurn, checkWinner, resetGame, getBoard, checkDiagonal1} = require('./academy');


module = module || {};
module.exports = {
    takeTurn: takeTurn,
    checkWinner: checkWinner,
    resetGame: resetGame,
    getBoard: getBoard,
}


test("Check winner is crosses", () => {
    //Arrange     
    board = getBoard();
    board[0][0] = "cross";
    board[0][1] = "cross";
    board[0][2] = "cross";

    expected_output = "crosses";

    // Act
    actual_output = checkWinner();

    // Assert
    expect(actual_output).toStrictEqual(expected_output);
})


test("Reset game", () => {
    //Arange

    board = getBoard();

    board[0][0] = null;
    board[0][1] = null;
    board[0][2] = null;
    board[1][0] = null;
    board[1][1] = null;
    board[1][2] = null;
    board[2][0] = null;
    board[2][1] = null;
    board[2][2] = null;


    expected_output = board;

    // Act
    actual_output = resetGame();


    //Assert
    expect(actual_output).toStrictEqual(expected_output);
})


test("Take turn", () => {
    //Arange  

    playerCount = 6;
    board = getBoard();

    board[0][0] = null;
    board[0][1] = null;
    board[0][2] = null;
    board[1][0] = "nought";
    board[1][1] = null;
    board[1][2] = null;
    board[2][0] = null;
    board[2][1] = null;
    board[2][2] = null;


    expected_output = board;

    // Act
    actual_output = takeTurn(1, 0);

    //Assert
    expect(actual_output).toStrictEqual(expected_output);
})

test("Check diagonals", () => {
    board = getBoard();

    board[0][0] = "cross";
    board[0][1] = null;
    board[0][2] = null;
    board[1][0] = null;
    board[1][1] = "cross";
    board[1][2] = null;
    board[2][0] = null;
    board[2][1] = null;
    board[2][2] = "cross";


    expected_output = board;
    // Act
    actual_output = checkDiagonal1(board);

    //Assert
    expect(actual_output).toStrictEqual(expected_output);

})