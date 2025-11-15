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
                board[i][j].clear();             // NEED TO INITIALIZE CLEAR in Cell()
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


