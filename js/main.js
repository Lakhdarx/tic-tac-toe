const columns = 3;
const rows = 3;


const Gameboard = function() {
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

    function isBoardFull() {
        for (i = 0; i < columns; i++) {
            board[i] = [];
            for (j = 0; j < rows; j++) {
                if (board[i][j] === '') {
                    return false;
                } 
            }
        }
        return true;
    }

    return {getBoard, resetBoard, placeMarker, isBoardFull};

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
        const board = Gameboard.getBoard();
        for (i = 0; i < columns; i++) {
            if (
                board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][0] === board[i][2]
            ) 
            {
                return true;
            }   
            if (
                board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[0][i] === board[2][i] 
            )
            {
                return true;
            }

        }
        return false;
        
    }

    function checkTie() {
        if (Gameboard.isBoardFull()) {
            return true;
        }
        else return false;
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

    return {checkWin, checkTie, getActivePlayer, switchPlayer, playTurn};

}();
