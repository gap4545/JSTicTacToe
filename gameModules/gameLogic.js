const gameLogic = (function() {

    let turn;
    
    const getTurn = (function() {
        return turn;
    });
    
    const changeTurn = (function() {

        // TODO: Rework turn to x or o here and in start
        turn = (turn === 0) ? 1 : 0; // If turn equals 0 turn becomes 1 if not turn equals 0;

    });
    
    const start = (function() {

        turn = Math.floor(Math.random() * 2); // Set turn to a random number from 0 to (players.length-1)
        gameboard.displayBoard();

    });
    
    return {start, getTurn, changeTurn};

})();

export default gameLogic;