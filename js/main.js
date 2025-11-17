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
            for (j = 0; j < rows; j++) {
                board[i][j].clear();             
            }
        }     
    }

    function placeMarker(marker, cell) {
        if (cell.getValue() === '#') {
           cell.setValue(marker); 
        }
        else {
            throw new Error("Cell is not empty");
        }
    }

    function isBoardFull() {
        for (i = 0; i < columns; i++) {
            for (j = 0; j < rows; j++) {
                if (board[i][j].getValue() === '#') {
                    return false;
                } 
            }
        }
        return true;
    }

    function printBoard() { 
        for (i = 0; i < columns; i++) {
            console.log(`${board[0][i].getValue()} | ${board[1][i].getValue()} | ${board[2][i].getValue()}`);
        }       
    }

    return {getBoard, resetBoard, placeMarker, isBoardFull, printBoard};

}();



function Player(name, marker) {
    if (marker === 'X' || marker === 'O') {
       return {name, marker} 
    }
    else throw new Error("Invalid marker");
}


function Cell() {
    let value = '#';

    function setValue(marker) {
        value = marker;
    }

    function  getValue() {
        return value;
    }

    function clear() {
        value = '#';
    }

    return {setValue, getValue, clear};
}

const gameController = function(){
    const playerOne = Player('Player1', 'X');
    const playerTwo = Player('Player2', 'O');
    let activePlayer  = Math.random() < 0.5 ? playerOne : playerTwo;

    function checkWin() {
        const board = Gameboard.getBoard();
        for (i = 0; i < columns; i++) {
            if (
                board[i][0].getValue() !== '#' &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][0].getValue() === board[i][2].getValue()
            ) 
            {
                return true;
            }   
            if (
                board[0][i].getValue() !== '#' &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[0][i].getValue() === board[2][i].getValue() 
            )
            {
                return true;
            }
            // DIAGONAL WINNING 3s
            if (
                board[0][0].getValue() !== '#' &&
                board[0][0].getValue() === board[1][1].getValue() &&
                board[0][0].getValue() === board[2][2].getValue() 
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
        Gameboard.printBoard();
        if (checkWin()) {
            console.log(`${gameController.getActivePlayer().name} has won the game`);
            displayController.displayWinner();
            return;
        }
        else if (checkTie()) {
            console.log(`Tie`);
            displayController.displayTie();
            return;
        }
        
        switchPlayer();
    }

    return {checkWin, checkTie, getActivePlayer, switchPlayer, playTurn};

}();


const restartBtn = document.querySelector("#restart");
const cells = document.querySelectorAll(".cell");
const output = document.querySelector("output");

const displayController = function() {
    
     
    function renderBoard() {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                gameController.playTurn(e.target.dataset.col, e.target.dataset.row);

                if (gameController.checkWin()) {
                    e.target.textContent = gameController.getActivePlayer().marker;
                }
                else {
                    e.target.textContent = gameController.getActivePlayer().marker === 'O' ? 'X' : 'O';
                }
            })
        });
    }

    function displayWinner() {
        output.textContent = `${gameController.getActivePlayer().name} has won the game`;
    }
    
    function displayTie() {
        output.textContent = 'Tie';
    }

    function resetOutput() {
        output.textContent = '';
    }


    function clearBoard() {
        forEach(cell => cell.textContent = '');
    }

    restartBtn.addEventListener('click', () => {
        Gameboard.resetBoard();
        clearBoard();
    });

    return {clearBoard, renderBoard, resetOutput, displayWinner, displayTie};

}();

displayController.renderBoard();