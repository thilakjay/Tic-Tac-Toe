# Tic-Tac-Toe

A straightfoward tic-tac-toe game. Objective is to code the game using module patterns and factory functions. Initially a 2-player game, but 2nd player is now a computer opponent.

Things learned:
1. Difference between factory functions and module patterns. Factory functions for creating more than one object instance. For this game, factory function was used to create two player objects. Module patterns used for singular objects (only one instance) - the board object (gameBoard) and an object to control the flow of the game (gameController).

2. Initially coded it to be a 2-player game, but the logic for determining winner didn't quite fit well when creating a computer opponent using minimax algorithm. 

3. Used freeCodeCamp's tutorial to create game and minimax algorithm.
Had some trouble understanding logic behind minimax, but finally understood what the algorithm is doing.