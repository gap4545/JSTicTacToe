let gameModuleContainer = document.querySelector('.module-container');


const game = (function () {

    // Imports
    const eventEmitter = import('./gameModules/eventEmitter.js');
    const gameboard = import('./gameModules/gameboard.js');
    const gameLogic = import('./gameModules/gameLogic.js');
    const playAgain = import('./gameModules/playAgain.js');
    const playerHandler = import('./gameModules/playerHandler.js');
    const playerTypeForms = import('./gameModules/playerTypeForms.js');
    const welcomeScreen = import('./gameModules/welcomeScreen.js');

})();








