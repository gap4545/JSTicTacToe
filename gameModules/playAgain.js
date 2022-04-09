const playAgainScreen = (function() {

    const eventEmitter = import('./eventEmitter.js');
    const myFunctions = import('../myFunctions');
    const gameboard = import('../gameboard');
    const welcomeScreen = import('../welcomeScreen');

    const gameModuleContainer = document.querySelector('.module-container');
    const playAgainDiv = document.createElement('div');
    const winnerDiv = document.createElement('div');
    const playSameButton = document.createElement('button');
    const playNewButton = document.createElement('button');

    const _destroy = (function () {

        myFunctions.animateOnce('shrink', winnerDiv, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('shrink', playSameButton, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('shrink', playNewButton, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('fade-out', playAgainDiv, {deleteElementAfter : true, removeClassAfter : true});

    });

    const _createScreen = (function() {

        playAgainDiv.classList.add('play-again-container');

        winnerDiv.classList.add('winner-text');

        playSameButton.classList.add('play-again-button');
        playSameButton.textContent = 'Play Again With Same Players';
        playSameButton.addEventListener('click', e => {
            gameboard.reset();
            _destroy();
        });

        playNewButton.classList.add('play-again-button');
        playNewButton.textContent = 'Play Again With New Players';
        playNewButton.addEventListener('click', e => {
            _destroy();
            gameboard.destroy();
            welcomeScreen.reset();
        });

        myFunctions.animateOnce('fade-in', playAgainDiv, {deleteElementAfter : false});
        myFunctions.animateOnce('bounce', winnerDiv, {removeClassAfter : true});
        myFunctions.animateOnce('expand', playSameButton);
        myFunctions.animateOnce('expand', playNewButton);

    })();

    const display = (function (winningPlayerNumber) {

        winnerDiv.textContent = `Player ${Number(winningPlayerNumber) + 1} Wins!`;
        gameModuleContainer.append(playAgainDiv);
        playAgainDiv.append(winnerDiv, playSameButton, playNewButton);

    });

    return {display};

})();

export default playAgainScreen;