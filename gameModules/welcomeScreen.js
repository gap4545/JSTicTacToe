const welcomeScreen = (function() {

    const eventEmitter = import('./eventEmitter.js');
    const playerTypeForms = import('./playerTypeForms.js');
    const myFunctions = import('../myFunctions.js');

    const gameModuleContainer = document.querySelector('.module-container');
    const header = document.createElement('div');
    const title = document.createElement('span');
    const welcomeTo = document.createElement('span');
    const underlineAnimation = document.createElement('span');
    const playerFormsContainer = document.createElement('div');
    const startButton = document.createElement('button');
    
    const _animations = (function() {

        myFunctions.animateOnce('bounce-from-top', welcomeTo, {removeClassAfter : true});

        welcomeTo.addEventListener('animationend', function() {
            myFunctions.animateOnce('expand', underlineAnimation, {removeClassAfter : true});
            welcomeTo.append(underlineAnimation);
            myFunctions.animateOnce('expand', playerFormsContainer, {removeClassAfter : true});
            gameModuleContainer.append(playerFormsContainer);
        }, {once : true});

    });

    const _init = (function() {

        gameModuleContainer.classList.add('welcome-screen');
        header.classList.add('header');
        title.classList.add('game-title');
        welcomeTo.classList.add('welcome-to-span');
        playerFormsContainer.classList.add('player-forms-container');
        underlineAnimation.classList.add('underline-animate');
        startButton.classList.add('start-button');
        
        startButton.textContent = 'START GAME';
        title.textContent = 'TIC-TAC-TOE';
        welcomeTo.textContent = 'Welcome to ';

        startButton.onclick = eventEmitter.emit('startGame', {});

        _animations();

        playerFormsContainer.append(playerTypeForms.playerOneForm, playerTypeForms.playerTwoForm);

        title.append(welcomeTo);
        header.append(title);
        gameModuleContainer.append(header);

    })();

    const _destroy = (function() {

        // TODO: Finish animating slide-down and slide-left for v
        if (document.querySelector('.welcome-to-span') != null) myFunctions.animateOnce('slide-down', welcomeTo, {deleteElementAfter : true});
        myFunctions.animateOnce('slide-down', playerFormsContainer, {deleteElementAfter : true});
        gameModuleContainer.classList.remove('welcome-screen');

        eventEmitter.emit('showBoard', {});
        eventEmitter.on('getNewPlayers', getNewPlayers);

    });

    const getNewPlayers = (function() {
        myFunctions.animateOnce('expand', playerFormsContainer, {removeClassAfter : true})
        eventEmitter.on('startGame', _destroy);
    });

    const _events = (function() {
        eventEmitter.on('startGame', _destroy);
    })();

})();

export default welcomeScreen;