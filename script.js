const game = (function () {

    const gameModuleContainer = document.querySelector('.module-container');

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
        const winnerDiv = document.createElement('div');
        const playSameButton = document.createElement('button');
        const playNewButton = document.createElement('button');
    
        const _destroy = (function () {
    
            animateOnce('shrink', winnerDiv, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playSameButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('shrink', playNewButton, {deleteElementAfter : true, removeClassAfter : true});
            animateOnce('fade-out', playAgainDiv, {deleteElementAfter : true, removeClassAfter : true});
    
        });
    
        const createScreen = (function() {
    
            playAgainDiv.classList.add('play-again-container');
    
            winnerDiv.classList.add('winner-text');
    
            playSameButton.classList.add('play-again-button');
            playSameButton.textContent = 'Play Again With Same Players';
            playSameButton.addEventListener('click', () => {
                gameboard.resetBoard();
                _destroy();
            });
    
            playNewButton.classList.add('play-again-button');
            playNewButton.textContent = 'Play Again With New Players';
            playNewButton.addEventListener('click', e => {
                _destroy();
                gameboard.destroy();
                gameLogic.resetPlayers();
                welcomeScreen.getNewPlayers();
            });
    
            animateOnce('fade-in', playAgainDiv, {deleteElementAfter : false});
            animateOnce('expand', playSameButton);
            animateOnce('expand', playNewButton);
    
        })();
    
        const display = (function (winningPlayerNumber) {
    
            winnerDiv.textContent = `Player ${winningPlayerNumber} Wins!`;
    
            playAgainDiv.append(winnerDiv, playSameButton, playNewButton);
            gameModuleContainer.append(playAgainDiv);
    
        });

        return {display};
    
    })();

    const gameLogic = (function() {

        let players = [];
        let turn;
        let turnsTaken = 0;
        let gameOver = false;
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
        let spaceInWinWay = [
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

        let openLocations = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
                for (let location of openLocations) {
                    for (let winWay of spaceInWinWay[location]) {
                        if (checkWins[winWay][0] === checkWins[winWay][1]) {
                            return location;
                        }
                    }
                }
                return openLocations[Math.floor(Math.random() * openLocations.length)];
            });
    
            return {type, getMove};
    
        });

        const createPlayers = (function() {
            players.push((document.querySelector('input[name="player1-radio"]:checked').value === 'player') ? _Player() : _Computer());
            players.push((document.querySelector('input[name="player2-radio"]:checked').value === 'player') ? _Player() : _Computer());
            if (players[turn - 1].type() === 'computer') {setLocationValue(players[turn - 1].getMove());};
        });

        const resetPlayers = (function () {
            players = [];
        });

        const _reset = (function() {
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
        });
        
        const _changeTurn = (function() {
            turn = (turn === 1) ? 2 : 1;
            if (players[turn - 1].type() === 'computer' && !gameOver) {
                gameboard.setSpace(players[turn - 1].getMove());
            };
        });
        
        const _checkWin = (function(wayToCheck) {
            if (wayToCheck[0] === wayToCheck[1] && wayToCheck[0] === wayToCheck[2]) {
                gameOver = true;
                playAgainScreen.display(turn);
                _reset();
            }
        });
    
        const setLocationValue = (function(location) {
            let ways = spaceInWinWay[location];
            openLocations.splice(openLocations.indexOf(location), 1);
            
            for(let way of ways) {
                checkWins[way].push(turn);
                _checkWin(checkWins[way]);
            }
            turnsTaken++;
            _changeTurn();
        });
        
        const getTurn = (function() {
            return turn;
        });

        return {setLocationValue, getTurn, createPlayers, resetPlayers};
    })();

    const gameboard = (function() {
    
        const boardContainer = document.createElement('div');
        const column1 = document.createElement('div');
        const column2 = document.createElement('div');
        const row1 = document.createElement('div');
        const row2= document.createElement('div');
        const animatedPlayerToken = document.createElement('span');
        const spaceButton = document.createElement('button');
        const boardArray = [];
        
        const _init = (function(){
            animatedPlayerToken.classList.add('player-token');
            boardContainer.classList.add('board-container');
            spaceButton.classList.add('space', 'open');
            column1.classList.add('board-column', 'column1');
            column2.classList.add('board-column', 'column2');
            row1.classList.add('board-row', 'row1');
            row2.classList.add('board-row', 'row2');

            boardContainer.append(column1, column2, row1, row2);
            animateOnce('from-right', boardContainer, {removeClassAfter : true});
        })();
    
        
        const setSpace = (function(location) {
            let tokenSpan = animatedPlayerToken.cloneNode();
            console.log(location);
            boardArray[location].value = gameLogic.getTurn();
            tokenSpan.textContent = (gameLogic.getTurn() === 1) ? 'X' : 'O';
            gameLogic.setLocationValue(location);
            boardArray[location].append(tokenSpan);
            boardArray[location].disabled = true;
        });
        
        const _createBoard = (function(){
            for (let location = 0; location < 9; location++) {
                let space = spaceButton.cloneNode();
                space.value = location;
                space.addEventListener('click', () => {
                    setSpace(location);
                });
                
                boardArray.push(space);
                boardContainer.append(boardArray[location]);
            };
        })();
        
        const displayBoard = (function() {
            gameModuleContainer.append(boardContainer);
        });

        const resetBoard = (function() {
            boardArray.forEach(space => {
                space.disabled = false;
                space.innerHTML = '';
            });
        });
    
        const destroy = (function() {
            animateOnce('slide-down', boardContainer, {deleteElementAfter : true, removeClassAfter : true});
            resetBoard();
        });

        return {resetBoard, destroy, displayBoard, setSpace};

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
                animateOnce('expand', playerFormsContainer, {removeClassAfter : true});
                gameModuleContainer.append(playerFormsContainer);
            }, {once : true});
        });
    
        const _init = (function() {
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
            gameModuleContainer.append(header);
        })();
    
        const _destroy = (function() {
            // TODO: Finish animating slide-down and slide-left for v
            if (document.querySelector('.welcome-to-span') != null) animateOnce('slide-down', welcomeTo, {deleteElementAfter : true});
            animateOnce('expand', playerFormsContainer, {deleteElementAfter : true});
            gameLogic.createPlayers();
            gameboard.displayBoard();
        });
    
        const getNewPlayers = (function() {
            animateOnce('expand', playerFormsContainer, {removeClassAfter : true})
            gameModuleContainer.append(playerFormsContainer);
        });

        return {getNewPlayers};
    
    })();



})();








