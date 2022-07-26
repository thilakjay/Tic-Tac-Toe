//to display and render the game board
const Gameboard = (() => {
    let grid = ["","","","","","","","",""];

    const reset = () => {
        grid.forEach((item, index) => grid[index] = "");       
    }

    const checkEndGameConditions = () => {
        //create logic here to check for winner (three identical cells)
        if((grid[0]===grid[1] && grid[1]===grid[2] && grid[1] !== "") ||
           (grid[3]===grid[4] && grid[4]===grid[5] && grid[4] !== "") ||
           (grid[6]===grid[7] && grid[7]===grid[8] && grid[7] !== "") ||
           (grid[0]===grid[3] && grid[3]===grid[6] && grid[3] !== "") ||
           (grid[1]===grid[4] && grid[4]===grid[7] && grid[4] !== "") ||
           (grid[2]===grid[5] && grid[5]===grid[8] && grid[5] !== "") ||
           (grid[0]===grid[3] && grid[3]===grid[6] && grid[3] !== "") ||
           (grid[0]===grid[4] && grid[4]===grid[8] && grid[4] !== "") ||
           (grid[2]===grid[4] && grid[4]===grid[6] && grid[4] !== "")) 
            return "win";
        else if(grid.every(item => item !== ""))
            return "tie";
    }
    
    const getWinningRow = () => {

    }

    return {grid, checkEndGameConditions, reset};
})();

//player object for player X & player O
const Player = (letter) => { 
    const mark = letter;

    const markCell = (e) => {
        e.target.textContent = mark; 
        Gameboard.grid[e.target.id] = mark;       
    }

    return {markCell, mark};
}


//object to control flow of game
const GameController = (() => {
    const container = document.querySelector("#game-container"); 
    const resetButton = document.querySelector("#reset-button");
    const playerX = Player("X");
    const playerO = Player("O");

    let currentPlayer = playerX;

    const changePlayerTurn = () => {
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
    }

    const declareWinner = (player) => {
        console.log(`Player ${player.mark} is the winner!`);
    }

    const declareTie = () => {
        console.log(`TIE GAME`);
    }

    const clickHandler = (e) => {
        currentPlayer.markCell(e);

        if(Gameboard.checkEndGameConditions() === "win") {
            declareWinner(currentPlayer);
            
            for(let i=0; i < container.children.length; i++) {
                container.children[i].removeEventListener("click", clickHandler);
            }

            return;
        }else if(Gameboard.checkEndGameConditions() === "tie"){
            declareTie();
            return;
        }
        changePlayerTurn();   
    }

    const render = () => {            
        Gameboard.grid.forEach((item, i) => {
            const cell = document.createElement("div");
            cell.id = i;
            cell.textContent = item;
            container.appendChild(cell);
            cell.addEventListener("click", clickHandler, {once : true});
        })
    } 

    const reset = () => {     
        Gameboard.reset();

        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }

        currentPlayer = playerX;
        render();
    }
    resetButton.addEventListener("click", reset);

    return {render};
})();

GameController.render();