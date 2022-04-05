let gameModuleContainer = document.querySelector('.module-container');
const div = document.createElement('div');
const span = document.createElement('span');
const button = document.createElement('button');

function animateOnce(animationClass, element, {deleteElementAfter = false, removeClassAfter = false} = {}) {

    element.classList.add(animationClass);
    element.addEventListener('animationend', e => {
        if (deleteElementAfter == true) {
            element.parentNode.removeChild(element);
        };
        if (removeClassAfter == true) {
            element.classList.remove(animationClass);
        };
    }, {once : true});

};

const playerModule = (function () {

    let player1;
    let player2;

    const _Player = (function(playerToken) {

        let token = playerToken;
        
        const getToken = (function() {
            return token;
        });

        const type = (function() {
            return 'Player';
        })
    
        return {getToken, type};

    });

    const _Computer = (function(playerToken) {

        const {getToken} = _Player(playerToken);

        const type = (function() {
            return 'Computer';
        });
        
        // TODO: Define computer logic here

        return {getToken, type};

    });

    const createPlayers = (function(player1Type, player2Type) {
        
        if (player1 != undefined) return;
        player1 = (player1Type === 'player') ? _Player('X') : _Computer('X');
        player2 = (player2Type === 'player') ? _Player('Y') : _Computer('Y');

    });

    const resetPlayers = (function () {

        player1 = undefined;
        player2 = undefined;

    });

    return {createPlayers, resetPlayers};

})();

const gameboard = (function() {

    const boardContainer = div.cloneNode();
    const animatedPlayerToken = span.cloneNode();
    const spaceButton = button.cloneNode();
    const boardArr = [];

    const _init = (function(){

        animatedPlayerToken.classList.add('player-token');
        boardContainer.classList.add('game-container');
        spaceButton.classList.add('open', 'space');
        spaceButton.value = 0;

    })();
    
    const _setSpace = (function(spaceButton) {

        spaceButton.value = game.getTurn();
        spaceButton.classList.replace('open', 'taken');
        animatedPlayerToken.textContent = game.getTurn();
        spaceButton.append(animatedPlayerToken);

    });

    const resetBoard = (function() {

        boardArr.forEach(spaceButton => {
            spaceButton.disabled = false;
            spaceButton.innerHTML = '';
            spaceButton.className = 'open space';
        });

    });


    const _createBoard = (function(){
        
        for (let i = 0; i <= 9; i++) boardArr.push(spaceButton.cloneNode());

        boardArr.forEach(spaceButton => {
            spaceButton.addEventListener('click', eve => {
                _setSpace(spaceButton);
                game.changeTurn();
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

        // TODO: Rework win check at some point

        if (
            (boardArr[4].value === boardArr[0].value && boardArr[4].value === boardArr[8].value) |
            (boardArr[4].value === boardArr[1].value && boardArr[4].value === boardArr[7].value) |
            (boardArr[4].value === boardArr[2].value && boardArr[4].value === boardArr[6].value) |
            (boardArr[4].value === boardArr[3].value && boardArr[4].value === boardArr[5].value) ) {
                _playAgainScreen.display(boardArr[4].value);
        } else if (
                (boardArr[0].value === boardArr[1].value && boardArr[0].value === boardArr[2].value) |
                (boardArr[0].value === boardArr[3].value && boardArr[0].value === boardArr[6].value) ) {
                _playAgainScreen.display(boardArr[0].value);
        } else if (
                (boardArr[8].value === boardArr[5].value && boardArr[8].value === boardArr[2].value) |
                (boardArr[8].value === boardArr[7].value && boardArr[8].value === boardArr[6].value) ) {
                _playAgainScreen.display(boardArr[8].value);
                };
    });
    
    return {displayBoard, resetBoard, destroy};

})();

const game = (function() {

    let players = [];
    let turn;
    
    const getTurn = (function() {
        return turn;
    });
    
    const changeTurn = (function() {

        // TODO: Rework turn to x or o here and in start
        turn = (turn === 0) ? 1 : 0; // If turn equals 0 turn becomes 1 if not turn equals 0;
        console.log(turn);

    });
    // ? Break out of game?
    const _playAgainScreen = (function() {

        let playAgainDiv = div.cloneNode();
        let winnerDiv = div.cloneNode();
        let playSameButton = button.cloneNode();
        let playNewButton = button.cloneNode();

        const _destroy = (function () {

            animateOnce('shrink', winnerDiv, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playSameButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playNewButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('fade-out', playAgainDiv, {deleteElementAfter : true, removeClassAfter : true});

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
                players = [];
                gameboard.destroy();
                welcomeScreen.reset();
            });
    
            animateOnce('fade-in', playAgainDiv, {deleteElementAfter : false});
            animateOnce('bounce', winnerDiv, {removeClassAfter : true});
            animateOnce('expand', playSameButton);
            animateOnce('expand', playNewButton);
    
        })();

        const display = (function (winningPlayerVal) {

            winnerDiv.textContent = `Player ${Number(winningPlayerVal) + 1} Wins!`;
            gameModuleContainer.append(playAgainDiv);
            playAgainDiv.append(winnerDiv, playSameButton, playNewButton);

        });

        return {display};

    })();
    
    const start = (function() {

        turn = Math.floor(Math.random() * 2); // Set turn to a random number from 0 to (players.length-1)
        gameModuleContainer.classList.add('game-screen');
        gameboard.displayBoard();

    });

    //Makes new player with the value of the length of the players array to keep it simple in getting each player for expansion purposes
    

    return {start, getTurn};

})();

const welcomeScreen = (function() {

    let header = div.cloneNode();
    let title = span.cloneNode();
    let welcomeTo = span.cloneNode();
    let underlineAnimation = span.cloneNode();
    let playerFormContainer = div.cloneNode();
    
    const _animations = (function() {

        animateOnce('bounce-from-top', welcomeTo, {removeClassAfter : true});

        welcomeTo.addEventListener('animationend', function() {
            animateOnce('expand', underlineAnimation, {removeClassAfter : true});
            welcomeTo.append(underlineAnimation);
            animateOnce('expand', playerFormContainer, {removeClassAfter : true});
            gameModuleContainer.append(playerFormContainer);
        }, {once : true});

        title.append(welcomeTo);

    });

    const _init = (function() {

        gameModuleContainer.classList.add('welcome-screen');
        header.classList.add('header');
        title.classList.add('game-title');
        welcomeTo.classList.add('welcome-to-span');
        playerFormContainer.classList.add('player-forms-container');
        underlineAnimation.classList.add('underline-animate');
        
        title.textContent = 'TIC-TAC-TOE';
        welcomeTo.textContent = 'Welcome to ';

        _animations();
        
        header.append(title);
        gameModuleContainer.append(header);

    })();

    const _destroy = (function() {

        animateOnce('slide-left', welcomeTo, {deleteElementAfter : true});
        playerFormContainer.classList.remove('expand');
        animateOnce('slide-down', playerFormContainer, {deleteElementAfter : true});
        gameModuleContainer.classList.remove('welcome-screen');

    });

    const _submitPlayers = (function() {

        let player1Type = document.querySelector('input[name="player1-radio"]:checked').value;
        let player2Type = document.querySelector('input[name="player2-radio"]:checked').value;
        playerModule.createPlayers(player1Type, player2Type);

    });

    const _gameStart = (function() {

        _submitPlayers();
        _destroy();
        game.start();

    });

    const _createForm = (function() {

        let radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');

        for (let i = 1; i <= 2; i++) {

            let playerForm = document.createElement('form');
            playerForm.classList.add('player-form');
            playerForm.setAttribute('name', `player${i}-form`);

            let formHeader = document.createElement('h2');
            formHeader.classList.add('player-form-header');
            formHeader.textContent = `Player ${i}`;

            let playerDiv = div.cloneNode();
            playerDiv.classList.add('type-container');
            
            let playerLabel = document.createElement('label');
            playerLabel.textContent = 'Human';
            playerLabel.classList.add('radio-label');

            let playerRadioButton = radioButton.cloneNode();
            playerRadioButton.classList.add('player-radio-button');
            playerRadioButton.setAttribute('name', `player${i}-radio`)
            playerRadioButton.setAttribute('id', `player${i}`)
            playerRadioButton.setAttribute('value', 'player');
            playerRadioButton.setAttribute('checked', 'true');
    
            let computerDiv = div.cloneNode();
            computerDiv.classList.add('type-container');
            
            let computerLabel = document.createElement('label');
            computerLabel.textContent = 'Computer';
            computerLabel.classList.add('radio-label');

            let computerRadioButton = radioButton.cloneNode();
            computerRadioButton.classList.add('computer-radio-button');
            computerRadioButton.setAttribute('name', `player${i}-radio`);
            computerRadioButton.setAttribute('id', `computer${i}`);
            computerRadioButton.setAttribute('value', 'computer');

            playerDiv.append(playerRadioButton, playerLabel);
            computerDiv.append(computerRadioButton, computerLabel);
            playerForm.append(formHeader, playerDiv, computerDiv);
            playerFormContainer.appendChild(playerForm);
        };

        let startGameButton = button.cloneNode()
        startGameButton.textContent = 'START GAME';
        startGameButton.classList.add('start-button');
        startGameButton.addEventListener('click', _gameStart);
        playerFormContainer.append(startGameButton);

    })();

    const reset = (function() {

        header.insertBefore(welcomeTo, title);
        _display();

    });

    return {reset};

})();