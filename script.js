let gameModuleContainer = document.querySelector('.module-container');

function animateOnce(animationClass, element, deleteElement) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', e => {
        element.classList.remove(animationClass);
        if (deleteElement == true) {
            element.parentNode.removeChild(element);
        };
    }, {once : true});
};

const game = (function() {

    let players = [];
    let turn;

    const _Player = (function(val) {

        let v = val;
        
        const getVal = (function() {
            return v;
        });

        const type = (function() {
            return 'Player';
        })
    
        return {getVal, type};
    });

    const _Computer = (function(val) {

        const {getVal} = _Player(val);

        const type = (function() {
            return 'Computer';
        });
        
        //Define computer logic here

        return {getVal, type};
    });
    
    const _getTurn = (function() {
        return turn;
    });
    
    const _changeTurn = (function() {
        turn = (turn === 0) ? 1 : 0; // If turn equals 0 turn becomes 1 if not turn equals 0;
        console.log(turn);
    });
    
    const _playAgainScreen = (function() {

        let playAgainDiv = document.createElement('div');
        let winnerDiv = document.createElement('div');
        let playSameButton = document.createElement('button');
        let playNewButton = document.createElement('button');

        const _destroy = (function () {
            animateOnce('shrink', winnerDiv, true);
            animateOnce('shrink', playSameButton, true);
            animateOnce('shrink', playNewButton, true);
            animateOnce('fade-out', playAgainDiv, true);
        });

        const _creation = (function() {
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
    
            animateOnce('fade-in', playAgainDiv, false);
            animateOnce('expand-bounce', winnerDiv, false);
            animateOnce('expand', playSameButton, false);
            animateOnce('expand', playNewButton, false);
    
        })();

        const display = (function (winningPlayerVal) {
            winnerDiv.textContent = `Player ${Number(winningPlayerVal) + 1} Wins!`;
            gameModuleContainer.append(playAgainDiv);
            playAgainDiv.append(winnerDiv, playSameButton, playNewButton);
        });

        return {display};
    })();

    const gameboard = (function() {

        let gameContainer = document.createElement('div');
        const boardArr = [];

        const setSpace = (function(spaceButton) {
            spaceButton.value = players[_getTurn()].getVal();
            spaceButton.classList.remove('open');
            spaceButton.classList.add('taken');
            spaceButton.textContent = spaceButton.value;
        })

        const reset = (function() {
            let i = 5;
            boardArr.forEach(spaceButton => {
                spaceButton.disabled = false;
                spaceButton.textContent = '';
                spaceButton.value = i;
                spaceButton.className = 'open space';
                i++;
            });
        });
    
        const _init = (function(){
            const spaceButton = document.createElement('button');
            for (let i = 0; i <= 9; i++) boardArr.push(spaceButton.cloneNode());
            boardArr.forEach(spaceButton => {
                spaceButton.addEventListener('click', eve => {
                    setSpace(spaceButton);
                    _changeTurn();
                    checkWin();
                    spaceButton.disabled = true;
                });
            })
            reset();
        })();
    
        const displayBoard = (function() {
            gameContainer.className = 'game-container';
            boardArr.forEach(e => {
                gameContainer.appendChild(e);
            });
            gameModuleContainer.append(gameContainer);
        });

        const destroy = (function() {
            reset();
            gameModuleContainer.removeChild(gameContainer);
        });
    
    
        const checkWin = (function() {
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
        
        return {displayBoard, reset, destroy};
    })();
    
    const start = (function() {
        turn = Math.floor(Math.random() * 2); // Set turn to a random number from 0 to (players.length-1)
        gameModuleContainer.classList.add('game-screen');
        gameboard.displayBoard();
    });

    //Makes new player with the value of the length of the players array to keep it simple in getting each player for expansion purposes
    const createPlayer = (function(playerType) {
        if (playerType === 'player') {
            players.push(_Player(players.length));
        } else if (playerType === 'computer') {
            players.push(_Computer(players.length))
        };
    });

    const logPlayers = (function() {
        console.log(players);
    })

    return {createPlayer, start, logPlayers, _getTurn};
})();

const welcomeScreen = (function() {

    let header = document.createElement('div');
    let title = document.createElement('span');
    let welcomeTo = document.createElement('span');
    let underlineAnimation = document.createElement('span');
    let playerSelectorDiv = document.createElement('div');

    const _init = (function() {
        gameModuleContainer.classList.add('welcome-screen');
        header.classList.add('header');
        title.classList.add('game-title');
        welcomeTo.classList.add('welcome-to-span');
        playerSelectorDiv.classList.add('player-forms-container');
        underlineAnimation.classList.add('underline-animate');
        title.textContent = 'TIC-TAC-TOE';
        welcomeTo.textContent = 'Welcome to ';
        welcomeTo.addEventListener('animationend', function() {
            underlineAnimation.classList.add('expand')
        }, {once : true});
        animateOnce('bounce-from-top', welcomeTo, false);
        header.append(welcomeTo, title);
    })();

    const _destroy = (function() {
        animateOnce('slide-left', welcomeTo, true);
        animateOnce('slide-down', playerSelectorDiv, true);
        gameModuleContainer.classList.remove('welcome-screen');
    });

    const _display = (function() {
        welcomeTo.appendChild(underlineAnimation);
        gameModuleContainer.append(header, playerSelectorDiv);
    });

    const _getPlayers = (function() {
        let forms = gameModuleContainer.querySelectorAll('.player-form');
        for (let i = 1; i <= forms.length; i++) {
            if (gameModuleContainer.querySelector(`#player${i}`).checked === true) {
                game.createPlayer('player');
            } else {
                game.createPlayer('computer');
            };
        };
    });

    const _start = (function() {
        _getPlayers();
        _destroy();
        game.start();
    });

    const _createForm = (function() {
        for (let i = 1; i <= 2; i++) {
            let playerForm = document.createElement('form');
            playerForm.className = 'player-form';
            playerForm.setAttribute('name', `player${i}-form`);
    
            let playerRadioLabel = document.createElement('label');
            playerRadioLabel.setAttribute('for', `player${i}`);
            playerRadioLabel.textContent = 'Player';
    
            let playerRadioButton = document.createElement('input');
            playerRadioButton.setAttribute('type', 'radio');
            playerRadioButton.setAttribute('name', `player${i}-radio`)
            playerRadioButton.setAttribute('id', `player${i}`)
            playerRadioButton.setAttribute('value', 'player');
            playerRadioButton.setAttribute('checked', 'true');
    
            let computerRadioLabel = document.createElement('label');
            computerRadioLabel.setAttribute('for', `computer${i}`);
            computerRadioLabel.textContent = 'Computer';
    
            let computerRadioButton = document.createElement('input');
            computerRadioButton.setAttribute('type', 'radio');
            computerRadioButton.setAttribute('name', `player${i}-radio`);
            computerRadioButton.setAttribute('id', `computer${i}`);
            computerRadioButton.setAttribute('value', 'computer');
    
            playerForm.append(playerRadioLabel, playerRadioButton, computerRadioLabel, computerRadioButton);
            playerSelectorDiv.appendChild(playerForm);
        };

        let startGameButton = document.createElement('button')
        startGameButton.textContent = 'START GAME';
        startGameButton.classList.add('start-button');
        startGameButton.addEventListener('click', _start);
        playerSelectorDiv.append(startGameButton);

        _display();
    })();

    const reset = (function() {
        header.insertBefore(welcomeTo, title);
        _display();
    });

    return {reset};
})();