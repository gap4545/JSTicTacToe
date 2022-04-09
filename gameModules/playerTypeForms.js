const playerTypeFormsModule = (function() {
    
    const myFunctions = import('../myFunctions');
    const eventEmitter = import('./eventEmitter.js');

    let playerOneForm;
    let playerTwoForm;
    let computerOneDifficulty;
    let computerTwoDifficulty;
    const startGameButton = document.createElement('button');

    const _changeDifficultyVisibility = (function(playerNumber, typeSelected) {
        let playerForm = (playerNumber === 1) ? playerOneForm : playerTwoForm;
        if (typeSelected === 'human') {
            playerForm.classList.remove('expand-form-bottom');
            myFunctions.animateOnce('shrink-form-bottom', playerForm);
        } else if (typeSelected === 'computer') {
            playerForm.classList.remove('shrink-form-bottom');
            myFunctions.animateOnce('expand-form-bottom', playerForm);
        };
    });

    const _changeDifficulty = (function(computerNumber, selectedDifficultyDiv, difficultyContainer) {
        let dropDownDiv = document.createElement('div');
        dropDownDiv.classList.add('difficulty-drop-down');

        let normalDiv = document.createElement('div');
        normalDiv.classList.add('difficulty-level');
        normalDiv.textContent = 'Normal';

        let impossibleDiv = document.createElement('div');
        impossibleDiv.classList.add('difficulty-level');
        impossibleDiv.textContent = 'Impossible';

        myFunctions.animateOnce('show-drop-down', difficultyContainer);
        dropDownDiv.append(normalDiv, impossibleDiv);
        difficultyContainer.append(dropDownDiv);

        // ! USE BUTTON FOR DROP DOWN. CAN USE .DISABLE 

        impossibleDiv.addEventListener('click', () => {
            selectedDifficultyDiv.textContent = impossibleDiv.textContent;
            difficultyContainer.classList.remove('show-drop-down');
            myFunctions.animateOnce('hide-drop-down', difficultyContainer);
            difficultyContainer.removeChild(dropDownDiv);
            (computerNumber === 1) ? computerOneDifficulty = 'impossible' : computerTwoDifficulty = 'impossible';
        }, {once : true});

        normalDiv.addEventListener('click', () => {
            selectedDifficultyDiv.textContent = normalDiv.textContent;
            dropDownDiv.classList.remove('show-drop-down');
            myFunctions.animateOnce('hide-drop-down', difficultyContainer);
            difficultyContainer.removeChild(dropDownDiv);
            (computerNumber === 1) ? computerOneDifficulty = 'normal' : computerTwoDifficulty = 'normal';
        }, {once : true})

    })

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
        playerRadioButton.addEventListener('click', e => {
            _changeDifficultyVisibility(playerNumber, 'human');
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
            _changeDifficultyVisibility(playerNumber, 'computer');
        });

        const computerDifficultyDiv = document.createElement('div');
        computerDifficultyDiv.classList.add('difficulty-container');

        const selectedDifficulty = document.createElement('div');
        selectedDifficulty.classList.add(`computer${playerNumber}-difficulty`);
        selectedDifficulty.textContent = 'Select Difficulty';
        selectedDifficulty.addEventListener('click', () => {
            _changeDifficulty(playerNumber, selectedDifficulty, computerDifficultyDiv);
        });
        computerDifficultyDiv.append(selectedDifficulty);
        
        const computerRadioDiv = typeContainer.cloneNode();
        computerRadioDiv.append(computerRadioButton, computerLabel);

        playerForm.append(formHeader, playerRadioDiv, computerDifficultyDiv, computerRadioDiv);
        return playerForm;

    });

    const _init = (function () {

        playerOneForm = _PlayerForm(1);
        playerTwoForm = _PlayerForm(2);

    })();

    return {playerOneForm, playerTwoForm};

})();

export default playerTypeFormsModule;