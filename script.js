let container = document.querySelector('.container');

const gameboard = (function() {

    const boardArr = [];

    const _init = (function(){
        const spaceButton = document.createElement('button');
        spaceButton.className = 'open space';
        spaceButton.value = 0;
        // spaceButton.onclick = DEFINE X OR O FUNC
        for (let i = 0; i <= 9; i++) boardArr.push(spaceButton.cloneNode());
    });

    _init();

    const _displayBoard = (function() {
        let gameContainer = document.createElement('div');
        gameContainer.className = 'game-container';
        boardArr.forEach(e => {
            gameContainer.appendChild(e);
        });
    });

    _displayBoard();

    const reset = (function() {
        boardArr.forEach(e => {
            e.value = 0;
            e.className = 'open space';
        });
    });

    const checkWin = (function() {
        if ((boardArr[4].value === boardArr[0].value && boardArr[4].value === boardArr[8].value) |
            (boardArr[4].value === boardArr[1].value && boardArr[4].value === boardArr[7].value) |
            (boardArr[4].value === boardArr[2].value && boardArr[4].value === boardArr[6].value) |
            (boardArr[4].value === boardArr[3].value && boardArr[4].value === boardArr[5].value)) {
                return boardArr[4].value;
        } else if (
                (boardArr[0].value === boardArr[1].value && boardArr[0].value === boardArr[2].value) |
                (boardArr[0].value === boardArr[3].value && boardArr[0].value === boardArr[6].value) ) {
                    return boardArr[0].value;
        } else if (
                (boardArr[8].value === boardArr[5].value && boardArr[8].value === boardArr[2].value) |
                (boardArr[8].value === boardArr[7].value && boardArr[8].value === boardArr[6].value) ) {
                    return boardArr[8].value;
                }
    });

    return {reset, checkWin};
})();

const playerHandler = (function() {

        let turn;
        let player1type;
        let player2type;

        const _init = (function() {
            turn = Math.floor(Math.random() * 2) + 1;
        })();
})