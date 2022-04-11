const playerTypeFormsModule = (function() {
    
    const myFunctions = import('../myFunctions');
    const eventEmitter = import('./eventEmitter.js');
    
    let playerOneForm;
    let playerTwoForm;
    let computerOneDifficulty = 'Select Difficulty';
    let computerTwoDifficulty = 'Select Difficulty';

    const _DifficultyDropDown = (function (playerNumber) {

        let computerDifficulty = (playerNumber === 1) ? computerOneDifficulty : computerTwoDifficulty;

        const dropDownContainer = document.createElement('div');
        dropDownContainer.classList.add('difficulty-container');

        const dropDownButton = document.createElement('button');
        dropDownButton.classList.add('drop-btn');
        dropDownButton.textContent = computerDifficulty;
        
        const dropDownContent = document.createElement('div');
        dropDownContent.classList.add('difficulty-content');
        
        const normalDifficulty = document.createElement('button');
        normalDifficulty.classList.add('difficulty-level');
        normalDifficulty.onclick = eventEmitter.emit('changeDifficulty', {difficulty : 'Normal', playerNumber : playerNumber});

        const impossibleDifficulty = document.createElement('button');
        impossibleDifficulty.classList.add('difficulty-level');
        impossibleDifficulty.onclick = eventEmitter.emit('changeDifficulty', {difficulty : 'Impossible', playerNumber : playerNumber});

        dropDownContent.append(normalDifficulty, impossibleDifficulty);
        dropDownContainer.append(dropDownButton, dropDownContent);

        return dropDownContainer;
        
    });

    const _changeDifficulty = (function({difficulty, playerNumber}) {

        (playerNumber === 1) ? computerOneDifficulty = difficulty : computerTwoDifficulty = difficulty;

    });

    const _showDifficultyDropDown = (function({playerNumber}) {

        let playerForm = (playerNumber === 1) ? playerOneForm : playerTwoForm;
        playerForm.classList.remove('shrink-form-bottom');
        myFunctions.animateOnce('expand-form-bottom', playerForm);

    });

    const _hideDifficultyDropDown = (function({playerNumber}) {

        let playerForm = (playerNumber === 1) ? playerOneForm : playerTwoForm;
        playerForm.classList.remove('expand-form-bottom');
        myFunctions.animateOnce('shrink-form-bottom', playerForm);

    })


    //     let normalDiv = document.createElement('div');
    //     normalDiv.classList.add('difficulty-level');
    //     normalDiv.textContent = 'Normal';

    //     let impossibleDiv = document.createElement('div');
    //     impossibleDiv.classList.add('difficulty-level');
    //     impossibleDiv.textContent = 'Impossible';

    //     myFunctions.animateOnce('show-drop-down', dropDownDiv);
    //     dropDownDiv.append(normalDiv, impossibleDiv);
    //     difficultyContainer.append(dropDownDiv);

    //     // ! USE BUTTON FOR DROP DOWN. CAN USE .DISABLE 

    //     impossibleDiv.addEventListener('click', () => {
    //         selectedDifficultyDiv.textContent = impossibleDiv.textContent;
    //         difficultyContainer.classList.remove('show-drop-down');
    //         myFunctions.animateOnce('hide-drop-down', difficultyContainer);
    //         difficultyContainer.removeChild(dropDownDiv);
    //         (computerNumber === 1) ? computerOneDifficulty = 'impossible' : computerTwoDifficulty = 'impossible';
    //     }, {once : true});

    //     normalDiv.addEventListener('click', () => {
    //         selectedDifficultyDiv.textContent = normalDiv.textContent;
    //         dropDownDiv.classList.remove('show-drop-down');
    //         myFunctions.animateOnce('hide-drop-down', difficultyContainer);
    //         difficultyContainer.removeChild(dropDownDiv);
    //         (computerNumber === 1) ? computerOneDifficulty = 'normal' : computerTwoDifficulty = 'normal';
    //     }, {once : true})


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
            eventEmitter.emit('hideDifficultyDropDown', {playerNumber : playerNumber});
            eventEmitter.removeListener('hideDifficultyDropDown', _hideDifficultyDropDown);
            eventEmitter.on('showDifficultyDropDown', _showDifficultyDropDown);
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
            eventEmitter.emit('showDifficultyDropDown', {playerNumber : playerNumber});
            eventEmitter.removeListener('showDifficultyDropDown', _showDifficultyDropDown);
            eventEmitter.on('hideDifficultyDropDown', _hideDifficultyDropDown);
        });

        const computerDifficultyDiv = _DifficultyDropDown(playerNumber);
        
        const computerRadioDiv = typeContainer.cloneNode();
        computerRadioDiv.append(computerRadioButton, computerLabel);

        playerForm.append(formHeader, playerRadioDiv, computerDifficultyDiv, computerRadioDiv);
        return playerForm;

    });

    const _init = (function () {

        eventEmitter.on('changeDifficulty', _changeDifficulty);
        eventEmitter.on('showDifficultyDropDown', _showDifficultyDropDown);

        playerOneForm = _PlayerForm(1);
        playerTwoForm = _PlayerForm(2);

    })();

    return {playerOneForm, playerTwoForm};

})();

export default playerTypeFormsModule;