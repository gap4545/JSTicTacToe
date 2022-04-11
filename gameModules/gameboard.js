const gameboard = (function() {

    const eventEmitter = import('./eventEmitter.js');
    const gameLogic = import('./gameLogic.js');

    const boardContainer = document.createElement('div');
    const animatedPlayerToken = document.createElement('span');
    const spaceButton = document.createElement('button');
    const boardArr = [];

    const _init = (function(){

        animatedPlayerToken.classList.add('player-token');
        boardContainer.classList.add('game-container');
        spaceButton.classList.add('space');

    })();
    
    const _setSpace = (function(spaceButton) {

        let tokenSpan = animatedPlayerToken.cloneNode();
        spaceButton.value = gameLogic.getTurn();
        tokenSpan.textContent = (gameLogic.getTurn() === 1) ? 'X' : 'O';
        spaceButton.append(tokenSpan);

    });

    const resetBoard = (function() {

        boardArr.forEach(spaceButton => {
            spaceButton.disabled = false;
            spaceButton.innerHTML = '';
        });

    });

    const _createBoard = (function(){
        
        for (let i = 1; i <= 9; i++) {
            boardArr.push(spaceButton.cloneNode())
        };

        boardArr.forEach(spaceButton => {
            spaceButton.addEventListener('click', eve => {
                _setSpace(spaceButton);
                gameLogic.changeTurn();
                checkWin();
                spaceButton.disabled = true;
            });
        });

    })();

    const displayBoard = (function() {

        boardArr.forEach(e => {
            boardContainer.appendChild(e);
        });
        gameModuleContainer.append(boardContainer);

    });

    const destroy = (function() {

        resetBoard();
        gameModuleContainer.removeChild(boardContainer);

    });


    const checkWin = (function() {

        // TODO: Rework win check

        if (
            (boardArr[4].value === boardArr[0].value && boardArr[4].value === boardArr[8].value) |
            (boardArr[4].value === boardArr[1].value && boardArr[4].value === boardArr[7].value) |
            (boardArr[4].value === boardArr[2].value && boardArr[4].value === boardArr[6].value) |
            (boardArr[4].value === boardArr[3].value && boardArr[4].value === boardArr[5].value) ) {
                eventEmitter.emit('gameover', {playerNumber : boardArr[4].value});
        } else if (
                (boardArr[0].value === boardArr[1].value && boardArr[0].value === boardArr[2].value) |
                (boardArr[0].value === boardArr[3].value && boardArr[0].value === boardArr[6].value) ) {
                eventEmitter.emit('gameover', {playerNumber : boardArr[0].value});
        } else if (
                (boardArr[8].value === boardArr[5].value && boardArr[8].value === boardArr[2].value) |
                (boardArr[8].value === boardArr[7].value && boardArr[8].value === boardArr[6].value) ) {
                eventEmitter.emit('gameover', {playerNumber : boardArr[8].value});
                };
    });

})();

export default gameboard;