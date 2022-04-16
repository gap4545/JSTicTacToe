const game = (function () {

    const gameModuleContainer = document.querySelector('.module-container');
    const contentContainer = document.createElement('div');
    let turn;
    const boardArray = [];

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

    const playerTypeForms = (function() {
        
        let playerOneForm;
        let playerTwoForm;
        let computerOneDifficulty = 'Select Difficulty';
        let computerTwoDifficulty = 'Select Difficulty';
    
        const _changeDifficulty = (function(difficulty, playerNumber, dropDownButton) {
    
            (playerNumber === 1) ? computerOneDifficulty = difficulty : computerTwoDifficulty = difficulty;
            dropDownButton.textContent = difficulty;
    
        });

        const _DifficultyDropDown = (function (playerNumber) {
    
            let computerDifficulty = (playerNumber === 1) ? computerOneDifficulty : computerTwoDifficulty;
    
            const dropDownContainer = document.createElement('div');
            dropDownContainer.classList.add('difficulty-container');
    
            const dropDownButton = document.createElement('button');
            dropDownButton.classList.add('drop-btn');
            dropDownButton.setAttribute('type', 'button');
            dropDownButton.textContent = computerDifficulty;
            
            const dropDownContent = document.createElement('div');
            dropDownContent.classList.add('difficulty-content');
            
            const normalDifficulty = document.createElement('button');
            normalDifficulty.setAttribute('type', 'button');
            normalDifficulty.classList.add('difficulty-level');
            normalDifficulty.textContent = 'Normal';
            normalDifficulty.addEventListener('click', () => {
                _changeDifficulty('Normal', playerNumber, dropDownButton);
            });
    
            const impossibleDifficulty = document.createElement('button');
            impossibleDifficulty.setAttribute('type', 'button');
            impossibleDifficulty.classList.add('difficulty-level');
            impossibleDifficulty.textContent = 'Impossible';
            impossibleDifficulty.addEventListener('click', () => {
                _changeDifficulty('Impossible', playerNumber, dropDownButton);
            });
    
            dropDownContent.append(normalDifficulty, impossibleDifficulty);
            dropDownContainer.append(dropDownButton, dropDownContent);
    
            return dropDownContainer;
            
        });
    
    
        const _showDifficultyDropDown = (function(playerForm) {
    
            playerForm.classList.remove('shrink-form-bottom');
            animateOnce('expand-form-bottom', playerForm);
    
        });
    
        const _hideDifficultyDropDown = (function(playerForm) {
    
            playerForm.classList.remove('expand-form-bottom');
            animateOnce('shrink-form-bottom', playerForm);
    
        });
    
        const _PlayerForm = (function(playerNumber) {
    
            const playerForm = document.createElement('form');
            playerForm.classList.add('player-form');
            playerForm.setAttribute('name', `player${playerNumber}-form`);
    
            const radioButton = document.createElement('input');
            radioButton.setAttribute('type', 'radio');
    
            const typeContainer = document.createElement('div');
            typeContainer.classList.add('type-container');
    
            const formHeader = document.createElement('h2');
            formHeader.classList.add('player-form-header');
            formHeader.textContent = `Player ${playerNumber}`;
    
            const formLabel = document.createElement('label');
            formLabel.classList.add('radio-label');
            formLabel.setAttribute('for', 'radio-label');
    
            const playerLabel = formLabel.cloneNode();
            playerLabel.textContent = 'Human';
    
            const playerRadioButton = radioButton.cloneNode();
            playerRadioButton.classList.add('player-radio-button');
            playerRadioButton.setAttribute('name', `player${playerNumber}-radio`)
            playerRadioButton.setAttribute('id', `player`)
            playerRadioButton.setAttribute('value', 'player');
            playerRadioButton.setAttribute('checked', 'true');
            playerRadioButton.addEventListener('click', () => {
                _hideDifficultyDropDown(playerForm);
            });
            
            const playerRadioDiv = typeContainer.cloneNode();
            playerRadioDiv.append(playerRadioButton, playerLabel);
            
            const computerLabel = formLabel.cloneNode();
            computerLabel.textContent = 'Computer';
    
            const computerRadioButton = radioButton.cloneNode();
            computerRadioButton.classList.add('computer-radio-button');
            computerRadioButton.setAttribute('name', `player${playerNumber}-radio`);
            computerRadioButton.setAttribute('id', `computer`);
            computerRadioButton.setAttribute('value', 'computer');
            computerRadioButton.addEventListener('click', e => {
                _showDifficultyDropDown(playerForm);
            });
    
            const computerDifficultyDiv = _DifficultyDropDown(playerNumber);
            
            const computerRadioDiv = typeContainer.cloneNode();
            computerRadioDiv.append(computerRadioButton, computerLabel);
    
            playerForm.append(formHeader, playerRadioDiv, computerDifficultyDiv, computerRadioDiv);
            return playerForm;
    
        });
    
        const _init = (function () {
    
            playerOneForm = _PlayerForm(1);
            playerTwoForm = _PlayerForm(2);
    
        })();
    
        return {playerOneForm, playerTwoForm, computerOneDifficulty, computerTwoDifficulty};
    
    })();

    const playAgainScreen = (function() {

        const playAgainDiv = document.createElement('div');
        const winnerHeader = document.createElement('h3');
        const playSameButton = document.createElement('button');
        const playNewButton = document.createElement('button');
    
        const _destroy = (function () {
            animateOnce('shrink', winnerHeader, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playSameButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playNewButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('fade-out', playAgainDiv, {deleteElementAfter : true, removeClassAfter : true});
        });
    
        const createScreen = (function() {
    
            playAgainDiv.classList.add('play-again-container');
    
            winnerHeader.classList.add('winner-text');
    
            playSameButton.classList.add('play-again-button');
            playSameButton.textContent = 'Play Again With Same Players';
            playSameButton.addEventListener('click', () => {
                gameboard.resetBoard();
                gameLogic.reset();
                _destroy();
            });
    
            playNewButton.classList.add('play-again-button');
            playNewButton.textContent = 'Play Again With New Players';
            playNewButton.addEventListener('click', e => {
                _destroy();
                gameboard.destroy();
                gameLogic.resetPlayers();
                gameLogic.reset();
                welcomeScreen.getNewPlayers();
            });
    
            animateOnce('fade-in', playAgainDiv, {removeClassAfter : true});
            animateOnce('expand', playSameButton, {removeClassAfter : true});
            animateOnce('expand', playNewButton, {removeClassAfter : true});
    
        })();
    
        const display = (function (winningPlayerNumber) {
    
            winnerHeader.textContent = `Player ${winningPlayerNumber} Wins!`;
    
            playAgainDiv.append(winnerHeader, playSameButton, playNewButton);
            contentContainer.append(playAgainDiv);
    
        });

        return {display};
    
    })();

    const gameLogic = (function() {

        let players = [];
        let turnsTaken = 0;
        const maxTurns = 9;
        let gameOver = false;
        let openLocations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let checkWins = [
            [], // 0, 4, 8
            [], // 1, 4, 7
            [], // 2, 4, 6
            [], // 3, 4, 5
            [], // 0, 3, 6
            [], // 2, 5, 8
            [], // 0, 1, 2
            [], // 6, 7, 8
        ];
        const spaceInWinWay = [
            [0, 4, 6],
            [1, 6],
            [2, 5, 6],
            [3, 4],
            [0, 1, 2, 3],
            [3, 5],
            [2, 4, 7],
            [1, 7],
            [0, 5, 7]
        ];
    
        // Board is arranged from left to right top to bottom 0-8
        // check wins nested arrays are labelled with the locations that are in that way to win
        // (space) (in way to win)
        // 0 in 0,5,7,
        // 1 in 2,7
        // 2 in 3,6,7
        // 3 in 4,5
        // 4 in 0,2,3,4
        // 5 in 4,6
        // 6 in 3,5,8
        // 7 in 8,2
        // 8 in 0,8,6

        const init = (function() {
            turn = Math.floor(Math.random() * 2) + 1; // Set turn to 1 or 2
        })();

        const _Player = (function() {
    
            const type = (function() {
                return 'player';
            })
        
            return {type};
    
        });
    
        const _Computer = (function() {
    
            const type = (function() {
                return 'computer';
            });
            
            const getMove = (function() {
                // for (let location of openLocations) {
                //     for (let winWay of spaceInWinWay[location]) {
                //         if (winWay.length < 2) {continue;};
                //         if (checkWins[winWay][0] === checkWins[winWay][1]) {
                //             return location;
                //         };
                //     };
                // };
                let move = openLocations[Math.floor(Math.random() * openLocations.length)]
                openLocations.splice(move, 1);
                return move;
            });
    
            return {type, getMove};
    
        });
        
        const createPlayers = (function() {
            players.push((document.querySelector('input[name="player1-radio"]:checked').value === 'player') ? _Player() : _Computer());
            players.push((document.querySelector('input[name="player2-radio"]:checked').value === 'player') ? _Player() : _Computer());
            if (players[turn - 1].type() === 'computer') {takeTurn(players[turn - 1].getMove());};
        });

        const resetPlayers = (function () {
            players = [];
        });

        const reset = (function() {
            checkWins = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ];
            openLocations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            turnsTaken = 0;
            gameOver = false;
        });
        
        const _changeTurn = (function() {
            console.log(checkWins);
            turn = (turn === 1) ? 2 : 1;
        });

        const _checkGameState = (function () {
            if (turnsTaken === maxTurns) {
                gameOver = true;
                return playAgainScreen.display(0); // TODO: Add tie screen
            };
        });
        
        const _checkWin = (function(wayToCheck) {
            if (wayToCheck[0] === wayToCheck[1] && wayToCheck[0] === wayToCheck[2]) {
                gameOver = true;
                playAgainScreen.display(turn);
                reset();
            };
        });
    
        const setSpaceValue = (function(location) {
            let ways = spaceInWinWay[location];
            
            for(let way of ways) {
                checkWins[way].push(turn);
                _checkWin(checkWins[way]);
            }
        });

        const takeTurn = (function(location) {
            turnsTaken++;
            setSpaceValue(location);
            setSpaceToken(location);
            boardArray[location].disabled = true;
            _changeTurn();
            if (players[turn - 1].type() === 'computer' && gameOver === false && turnsTaken < maxTurns) {
                takeTurn(players[turn - 1].getMove());
            };
        });

        const setSpaceToken = (function(location) {
            let tokenSpan = document.createElement('span');
            tokenSpan.classList.add('player-token');
            animateOnce('expand-token', tokenSpan, {removeClassAfter : true})
            tokenSpan.textContent = (turn === 1) ? 'X' : 'O';
            boardArray[location].append(tokenSpan);
        });

        return {takeTurn, createPlayers, resetPlayers, reset};
    })();

    const gameboard = (function() {
    
        const boardContainer = document.createElement('div');
        const column1 = document.createElement('div');
        const column2 = document.createElement('div');
        const row1 = document.createElement('div');
        const row2= document.createElement('div');
        const spaceButton = document.createElement('button');
        
        const _init = (function() {
            boardContainer.classList.add('board-container');
            spaceButton.classList.add('space', 'open');
            column1.classList.add('board-column', 'column1');
            column2.classList.add('board-column', 'column2');
            row1.classList.add('board-row', 'row1');
            row2.classList.add('board-row', 'row2');

            boardContainer.append(column1, column2, row1, row2);
        })();
        
        const _createBoard = (function(){
            for (let location = 0; location < 9; location++) {
                let space = spaceButton.cloneNode();
                space.value = location;
                space.addEventListener('click', () => {
                    gameLogic.takeTurn(location);
                });
                
                boardArray.push(space);
                boardContainer.append(boardArray[location]);
            };
        })();
        
        const displayBoard = (function() {
            animateOnce('from-right', boardContainer, {removeClassAfter : true});
            contentContainer.append(boardContainer);
        });

        const resetBoard = (function() {
            boardArray.forEach(space => {
                space.disabled = false;
                if (space.querySelector('span') != null) {
                animateOnce('shrink-token', space.querySelector('span'), {deleteElementAfter : true, removeClassAfter : true})
                }
            });
        });
    
        const destroy = (function() {
            animateOnce('to-left', boardContainer, {deleteElementAfter : true, removeClassAfter : true});
            resetBoard();
        });

        return {resetBoard, destroy, displayBoard};

    })();

    const welcomeScreen = (function() {
    
        const header = document.createElement('div');
        const title = document.createElement('span');
        const welcomeTo = document.createElement('span');
        const underlineAnimation = document.createElement('span');
        const playerFormsContainer = document.createElement('div');
        const startButton = document.createElement('button');
        
        const _animations = (function() {
            animateOnce('bounce-from-top', welcomeTo, {removeClassAfter : true});
    
            welcomeTo.addEventListener('animationend', function() {
                animateOnce('expand', underlineAnimation, {removeClassAfter : true});
                welcomeTo.append(underlineAnimation);
                animateOnce('from-right', playerFormsContainer, {removeClassAfter : true});
                contentContainer.append(playerFormsContainer);
            }, {once : true});
        });
    
        const _init = (function() {
            contentContainer.classList.add('content');
            header.classList.add('header');
            title.classList.add('game-title');
            welcomeTo.classList.add('welcome-to-span');
            playerFormsContainer.classList.add('player-forms-container');
            underlineAnimation.classList.add('underline-animate');
            startButton.classList.add('start-button');
            
            startButton.textContent = 'START GAME';
            title.textContent = 'TIC-TAC-TOE';
            welcomeTo.textContent = 'Welcome to ';
    
            startButton.addEventListener('click', function() {
                _destroy();
            });
    
            _animations();
    
            playerFormsContainer.append(playerTypeForms.playerOneForm, playerTypeForms.playerTwoForm, startButton);
    
            title.append(welcomeTo);
            header.append(title);
            gameModuleContainer.append(header, contentContainer);
        })();
    
        const _destroy = (function() {
            if (document.querySelector('.welcome-to-span') != null) animateOnce('down', welcomeTo, {deleteElementAfter : true});
            animateOnce('to-left', playerFormsContainer, {deleteElementAfter : true, removeClassAfter : true});
            gameLogic.createPlayers();
            gameboard.displayBoard();
        });
    
        const getNewPlayers = (function() {
            contentContainer.append(playerFormsContainer);
            animateOnce('from-right', playerFormsContainer, {removeClassAfter : true})
        });

        return {getNewPlayers};
    
    })();



})();