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

    const destroy = (function () {

        eventEmitter.removeListener('playSame', destroy);
        eventEmitter.removeListener('playNew', destroy);

        myFunctions.animateOnce('shrink', winnerDiv, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('shrink', playSameButton, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('shrink', playNewButton, {deleteElementAfter : true, removeClassAfter : true});
        myFunctions.animateOnce('fade-out', playAgainDiv, {deleteElementAfter : true, removeClassAfter : true});

    });

    const createScreen = (function() {

        playAgainDiv.classList.add('play-again-container');

        winnerDiv.classList.add('winner-text');

        playSameButton.classList.add('play-again-button');
        playSameButton.textContent = 'Play Again With Same Players';
        playSameButton.onclick = eventEmitter.emit('playSame', {})
        // playSameButton.addEventListener('click', e => {
        //     gameboard.reset();
        //     destroy();
        // });

        playNewButton.classList.add('play-again-button');
        playNewButton.textContent = 'Play Again With New Players';
        playNewButton.onclick = eventEmitter.emit('playNew', {});
        // playNewButton.addEventListener('click', e => {
        //     destroy();
        //     gameboard.destroy();
        //     welcomeScreen.reset();
        // });

        myFunctions.animateOnce('fade-in', playAgainDiv, {deleteElementAfter : false});
        myFunctions.animateOnce('bounce', winnerDiv, {removeClassAfter : true});
        myFunctions.animateOnce('expand', playSameButton);
        myFunctions.animateOnce('expand', playNewButton);

    })();

    const display = (function (winningPlayerNumber) {

        eventEmitter.on('playSame', destroy);
        eventEmitter.on('playNew', destroy);

        winnerDiv.textContent = `Player ${Number(winningPlayerNumber)} Wins!`;

        gameModuleContainer.append(playAgainDiv);
        playAgainDiv.append(winnerDiv, playSameButton, playNewButton);

    });

    const events = (function () {
        eventEmitter.on('gameover', display);
    })();

})();

export default playAgainScreen;