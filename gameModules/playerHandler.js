const playerModule = (function () {

    const eventEmitter = import('./eventEmitter.js');
    eventEmitter.on('startGame', createPlayers);
    
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

    const createPlayers = (function() {

        let player1Type = document.querySelector('input[name="player1-radio"]:checked').value;
        let player2Type = document.querySelector('input[name="player2-radio"]:checked').value;

        player1 = (player1Type === 'player') ? _Player('X') : _Computer('X');
        player2 = (player2Type === 'player') ? _Player('O') : _Computer('O');

        eventEmitter.removeListener('startGame', createPlayers);
        eventEmitter.on('getNewPlayers', resetPlayers);

    });

    const resetPlayers = (function () {

        player1 = undefined;
        player2 = undefined;

        eventEmitter.on('startGame', createPlayers);

    });

    return {};

})();

export default playerModule;