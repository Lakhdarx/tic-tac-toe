const Gameboard = function() {
    const columns = 3;
    const rows = 3;
    let board = [];

    for (i = 0; i < columns; i++) {
        board[i] = [];
        for (j = 0; j < rows; j++) {
            board[i][j] = Cell();
        }
    }

    function getBoard() {
        return board;
    }

    function resetBoard() {
        for (i = 0; i < columns; i++) {
            board[i] = [];
            for (j = 0; j < rows; j++) {
                board[i][j].clear();             
            }
        }     
    }

    function placeMarker(marker, cell) {
        if (cell.getValue === '') {
           cell.setValue(marker); 
        }
        else {
            throw new Error("Cell is not empty");
        }
    }

    return {getBoard, resetBoard, placeMarker};

}();



function Player(name, marker) {
    if (marker === 'X' || marker === 'O') {
       return {name, marker} 
    }
    else throw new Error("Invalid marker");
}


function Cell() {
    let value = '';

    function setValue(marker) {
        value = marker;
    }

    function  getValue() {
        return value;
    }

    function clear() {
        value = '';
    }

    return {setValue, getValue, clear};
}

const gameController = function(){
    const playerOne = Player('Lakhdar', 'X');
    const playerTwo = Player('Andrej', 'O');
    let activePlayer  = Math.random() < 0.5 ? playerOne : playerTwo;

    function checkWin() {
        
    }

    function checkTie() {

    }

    function getActivePlayer() {
        return activePlayer;
    }

    function switchPlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    function playTurn(col, row) {
        Gameboard.placeMarker(getActivePlayer().marker, Gameboard.getBoard()[col][row]);
        checkWin();
        checkTie();
        switchPlayer();
    }

    return {checkWin, checkTie, getActivePlayer, switchPlayer};

}();
