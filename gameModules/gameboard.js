const gameboard = (function() {

    const eventEmitter = import('./eventEmitter.js');
    const myFunctions = import('../myFunctions');

    const gameModuleContainer = document.querySelector('.module-container');
    const boardContainer = document.createElement('div');
    const animatedPlayerToken = document.createElement('span');
    const spaceButton = document.createElement('button');
    const boardArray = [];

    let turn;

    const init = (function(){
        animatedPlayerToken.classList.add('player-token');
        boardContainer.classList.add('board-container');
        spaceButton.classList.add('space', 'open');

        myFunctions.animateOnce('from-right-to-center', boardContainer, {removeClassAfter : true});

        eventEmitter.on('showBoard', displayBoard);
        eventEmitter.on('spaceTaken', setSpace);
        eventEmitter.on('turn', (newTurn) => {turn = newTurn});
    })();
    
    const createBoard = (function(){
        for (let i = 0; i < 9; i++) {
            let space = spaceButton.cloneNode();
            space.value = i;
            space.onclick = eventEmitter.emit('spaceTaken', {location : space.value});
            space.disabled = true;
            
            boardArray.push(space);
            boardContainer.append(space);
        };
    })();

    const setSpace = (function(location) {
        let tokenSpan = animatedPlayerToken.cloneNode();
        boardArray[location].value = turn;
        tokenSpan.textContent = (turn === 1) ? 'X' : 'O';
        boardArray[location].append(tokenSpan);
    });

    const resetBoard = (function() {
        boardArray.forEach(spaceButton => {
            spaceButton.disabled = false;
            spaceButton.innerHTML = '';
        });
    });

    const displayBoard = (function() {
        gameModuleContainer.append(boardContainer);
        eventEmitter.removeListener('showBoard', displayBoard);
        eventEmitter.on('playNew', destroy);
        eventEmitter.on('playSame', resetBoard);
    });

    const destroy = (function() {
        myFunctions.animateOnce('slide-left', boardContainer, {deleteElementAfter : true, removeClassAfter : true});
        eventEmitter.on('showBoard', displayBoard);
    });


    // const checkWin = (function() {

         // TODO: Rework win check

    //     if (
    //         (boardArr[4].value === boardArr[0].value && boardArr[4].value === boardArr[8].value) |
    //         (boardArr[4].value === boardArr[1].value && boardArr[4].value === boardArr[7].value) |
    //         (boardArr[4].value === boardArr[2].value && boardArr[4].value === boardArr[6].value) |
    //         (boardArr[4].value === boardArr[3].value && boardArr[4].value === boardArr[5].value) ) {
    //             eventEmitter.emit('gameover', {playerNumber : boardArr[4].value});
    //     } else if (
    //             (boardArr[0].value === boardArr[1].value && boardArr[0].value === boardArr[2].value) |
    //             (boardArr[0].value === boardArr[3].value && boardArr[0].value === boardArr[6].value) ) {
    //             eventEmitter.emit('gameover', {playerNumber : boardArr[0].value});
    //     } else if (
    //             (boardArr[8].value === boardArr[5].value && boardArr[8].value === boardArr[2].value) |
    //             (boardArr[8].value === boardArr[7].value && boardArr[8].value === boardArr[6].value) ) {
    //             eventEmitter.emit('gameover', {playerNumber : boardArr[8].value});
    //             };
    // });

})();

export default gameboard;