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
    });
    
    const playAgain = (function(winningPlayer) {
        let playAgainDiv = document.createElement('div');
        playAgainDiv.classList.add('play-again-container');

        let winnerDiv = document.createElement('div');
        winnerDiv.classList.add('winner-text');
        winnerDiv.textContent = `Player ${winningPlayer.getVal() + 1} Wins!`;

        let playSame = document.createElement('button');
        playSame.classList.add('play-again-button');
        playSame.textContent = 'Play Again With Same Players';

        let playNew = document.createElement('button');
        playNew.classList.add('play-again-button');
        playNew.textContent = 'Play Again With New Players';

        
    })

    const gameboard = (function() {

        const boardArr = [];

        const setSpace = (function(spaceButton) {
            spaceButton.value = players[_getTurn()].getVal();
            console.log({set : spaceButton.value})
            _changeTurn();
            checkWin();
            spaceButton.classList.remove('open');
            spaceButton.classList.add('taken');
            spaceButton.textContent = spaceButton.value;
        })

        const reset = (function() {
            let i = 5;
            boardArr.forEach(spaceButton => {
                spaceButton.value = i;
                spaceButton.className = 'open space';
                spaceButton.addEventListener('click', eve => {
                    setSpace(spaceButton);
                }, {once : true});
                i++;
            });
        });
    
        const _init = (function(){
            const spaceButton = document.createElement('button');
            for (let i = 0; i <= 9; i++) boardArr.push(spaceButton.cloneNode());
            reset();
        })();
    
        const displayBoard = (function() {
            let gameContainer = document.createElement('div');
            gameContainer.className = 'game-container';
            boardArr.forEach(e => {
                gameContainer.appendChild(e);
            });
            gameModuleContainer.append(gameContainer);
        });
    
    
        const checkWin = (function() {
            if (
                (boardArr[4].value === boardArr[0].value && boardArr[4].value === boardArr[8].value) |
                (boardArr[4].value === boardArr[1].value && boardArr[4].value === boardArr[7].value) |
                (boardArr[4].value === boardArr[2].value && boardArr[4].value === boardArr[6].value) |
                (boardArr[4].value === boardArr[3].value && boardArr[4].value === boardArr[5].value) ) {
                    console.log(boardArr[4].value);
            } else if (
                    (boardArr[0].value === boardArr[1].value && boardArr[0].value === boardArr[2].value) |
                    (boardArr[0].value === boardArr[3].value && boardArr[0].value === boardArr[6].value) ) {
                    console.log(boardArr[0].value);
            } else if (
                    (boardArr[8].value === boardArr[5].value && boardArr[8].value === boardArr[2].value) |
                    (boardArr[8].value === boardArr[7].value && boardArr[8].value === boardArr[6].value) ) {
                    console.log(boardArr[8].value);
                    };
        });
        
        return {displayBoard, reset};
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

    return {createPlayer, start}
})();

const welcomeScreen = (function() {

    let header = document.createElement('div');
    let title = document.createElement('span');
    let welcomeTo = document.createElement('span');
    let playerSelectorDiv = document.createElement('div');

    const _init = (function() {
        gameModuleContainer.classList.add('welcome-screen');
        header.classList.add('header');
        title.classList.add('game-title');
        title.textContent = 'TIC-TAC-TOE';
        welcomeTo.textContent = 'Welcome to ';
        welcomeTo.classList.add('welcome-to-span');
        header.append(welcomeTo, title);
        playerSelectorDiv.classList.add('player-forms-container');
    })();

    const _destroy = (function() {
        animateOnce('slide-left', welcomeTo, true);
        animateOnce('slide-down', playerSelectorDiv, true);
        gameModuleContainer.classList.remove('welcome-screen');
    });

    const _getPlayers = (function() {
        let forms = document.querySelectorAll('.player-form');
        for (let i = 1; i <= forms.length; i++) {
            if (document.querySelector(`#player${i}`).checked === true) {
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
        startGameButton.addEventListener('click', _start, {once : true});
        playerSelectorDiv.append(startGameButton);
    })();

    const _display = (function() {
        gameModuleContainer.append(header, playerSelectorDiv);
    })();
})();