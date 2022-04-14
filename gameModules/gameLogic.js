const gameLogic = (function() {

    const eventEmitter = import('./eventEmitter.js');
    let turn;
    let turnsTaken = 0;
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
        [1, 5, 7],
        [2, 7],
        [3, 6, 7],
        [4, 5],
        [1, 2, 3, 4],
        [4, 6],
        [3, 5, 8],
        [2, 8],
        [1, 6, 8]
    ]

    // Board is arranged from left to right top to bottom 0-8
    // check wins nested arrays are labelled with the spaces that are in that way to win
    // space in way to win
    // 0 in 1,5,7,
    // 1 in 2,7
    // 2 in 3,6,7
    // 3 in 4,5
    // 4 in 1,2,3,4
    // 5 in 4,6
    // 6 in 3,5,8
    // 7 in 8,2
    // 8 in 1,8,6
    
    const init = (function() {
        turn = Math.floor(Math.random() * 3); // Set turn to 1 or 2
        eventEmitter.on('spaceTaken', setWays);
    })();
    
    const changeTurn = (function() {
        turn = (turn === 1) ? 1 : 2;
        turnsTaken++;
        eventEmitter.emit('turn', turn);
    });

    const setWays = (function(location) {
        let ways = spaceInWinWay[location];

        for(let way in ways) {
            checkWins[way].push(turn);
            checkWin(checkWins[way]);
        }
        changeTurn();
    });

    const checkWin = (function(wayToCheck) {
        if (turnsTaken <= 5 | wayToCheck.length() < 3) return;
        if (wayToCheck[0] === wayToCheck[1] === wayToCheck[2]) eventEmitter.emit('gameover', {turn});
    })

})();

export default gameLogic;