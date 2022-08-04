const gameBoard = (() => {
    let grid;

    return {grid};
})();

const player = (playerLetter) => { 
    const letter = playerLetter;
    
    return {letter};
};

const gameController = (() => {
    //array containing all possible combinations of indexes to produce a win.
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const humanPlayer = player("X");
    const aiPlayer = player("O");
    
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", startGame);

    let isGameOver;

    function startGame() {
        isGameOver = false;
        gameBoard.grid = [0,1,2,3,4,5,6,7,8];
        for(let i=0; i < cells.length; i++) {
            cells[i].innerText = "";
            cells[i].style.backgroundColor = "black";
            cells[i].style.color = "white";
            cells[i].addEventListener("click", clickHandler, {once:true});
        }
    }

    function clickHandler(e) {
        if(e.target.innerText === "") {
            playerTurn(e.target.id, humanPlayer);
            
            if(isGameOver) return;

            if(!checkTieGame()) {
                setTimeout(() => playerTurn(getBestMove(), aiPlayer), 200);
            }           
        }       
    }

    function checkTieGame() {
        if(gameBoard.grid.every(cell => typeof cell !== "number")) {
            cells.forEach(cell => {
                cell.removeEventListener("click", clickHandler, {once:true});
                cell.style.backgroundColor = "gray";
                isGameOver = true;
            })
            return true;
        }
        return false;    
    }

    function getBestMove() {
        return minimax(gameBoard.grid, aiPlayer).index;
    }

    function playerTurn(cellId, player) {
        gameBoard.grid[cellId] = player.letter;
        document.getElementById(cellId).innerText = player.letter;     
        let winningCombo = checkWin(gameBoard.grid, player);
        if(winningCombo) endGame(winningCombo);
    }

    function endGame(winningCombo) {
        for(let elementIndex of winningCombos[winningCombo.index]) {
            console.log(winningCombos[winningCombo.index]);
            document.getElementById(elementIndex).style.backgroundColor = "white";
            document.getElementById(elementIndex).style.color = "black";
        }

        for(let i=0; i<cells.length; i++) {
            cells[i].removeEventListener("click", clickHandler);
        }
        
        isGameOver = true;
    }

    function checkWin(grid, player) {
        //find every index on the grid(array) that the player has played in.
        const cellsPlayed = grid.map((cell, index) => {
            if(cell === player.letter) return index;
        }).filter(cell => cell !== undefined);

        let winningCombo = null;

        //check if played cells has a winning combination & return the index of
        // winning combination and the winning player.
        for(let [index, combo] of winningCombos.entries()) {
            if(combo.every(cell => (cellsPlayed.indexOf(cell) > -1))) {
                return winningCombo = {index: index, player: player};
            }
        }

        return winningCombo;
    }

    function minimax(newGrid,player) {
        //store all available (unplayed) spaces/cell on the board into an array
        let availableCells = gameBoard.grid.filter(cell => typeof cell === "number");
        
        //checks end game state and returns a score based on winner or tie game.
        //since minimax is initially called on the aiPlayer, it returns -100 if human wins,
        // +100 if aiplayer wins, and 0 if tie game.
        if(checkWin(newGrid, humanPlayer)) {
            return {score: -100};
        }else if(checkWin(newGrid, aiPlayer)) {
            return {score: 100};
        }else if(availableCells.length === 0) {
            return {score: 0};
        }

        //store each move object {index: index, score: score} into moves array
        let moves = [];

        //loop through each available space on board/grid
        for(let i=0; i<availableCells.length; i++) {

            let move = {};

            //current index of available cell is stored
            move.index = newGrid[availableCells[i]];

            //player's turn is made on the first available cell
            newGrid[availableCells[i]] = player.letter;

            //depending on player's turn, minimax is called with the newly made move
            //on the board/grid. The function is called recursively and a score is returned 
            //once an end-game state is found.
            if(player.letter === aiPlayer.letter) {
                let result = minimax(newGrid, humanPlayer);
                move.score = result.score;
            }else {
                let result = minimax(newGrid, aiPlayer);
                move.score = result.score;
            }

            //the player's turn (letter) is removed and is a blank space again.
            newGrid[availableCells[i]] = move.index;

            //the object (index of the move and its respective score) is pushed to the array.
            moves.push(move);
        }

        //we check for the best move according to the player's turn.
    
        let bestMove;

        //aiPlayer loops over and picks move with the highest score; 
        //highest score = best move for ai
        if(player.letter === aiPlayer.letter) {
            let bestScore = -1000;
            
            for(let i=0; i<moves.length; i++) {
                if(moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        //humanPlayer loops over and picks move with the lowest score; 
        //lowest score = best move for human
        }else {
            let bestScore = 1000;
            
            for(let i=0; i<moves.length; i++) {
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        //returns the best possible move that a player can make
        return moves[bestMove];
    }

    return {startGame}; 
})();

gameController.startGame();

