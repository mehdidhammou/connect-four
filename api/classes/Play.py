import math
from classes.ConnectFourBoard import ConnectFourBoard
from classes.move import Move


class Play:
    def __init__(self):
        self.board = ConnectFourBoard()

    def humanTurn(self):
        while True:
            try:
                col = int(input("Enter your move (column 1-7): "))
                col = col - 1
                row = self.findLowestEmptyRow(col)
                human_move = {"row": row, "col": col}
                possible_moves = [move for move in self.board.getPossibleMoves()]
                if human_move in possible_moves:
                    self.board.makeMove(human_move, 1)
                    break
                else:
                    print("Invalid move. Try again.")
            except ValueError:
                print("Invalid input. Please enter a number.")

    def findLowestEmptyRow(self, col):
        for row in range(self.board.rows - 1, -1, -1):
            if self.board.board[row][col] == 0:
                return row
        return -1  # Column is full

    def computerTurn(self, heuristic=1) -> Move:
        _, move = self.minimaxAlphaBetaPruning(
            board=self.board,
            depth=4,
            alpha=-math.inf,
            beta=math.inf,
            heuristic=heuristic,
            maximizingPlayer=True,
        )
        return move

    def minimaxAlphaBetaPruning(
        self, board: ConnectFourBoard, depth, alpha, beta, heuristic, maximizingPlayer
    ) -> tuple[int, Move]:
        if depth == 0 or board.gameOver():
            if heuristic == 1:
                return board.heuristicEval(2), None
            else:
                return board.heuristicEval2(2), None

        possibleMoves = board.getPossibleMoves()
        if maximizingPlayer:
            maxEval = -math.inf
            bestMove = None
            for move in possibleMoves:
                
                newBoard = ConnectFourBoard()
                newBoard.board = [row[:] for row in board.board]
                
                newBoard.makeMove(move, 2)

                eval, _ = self.minimaxAlphaBetaPruning(
                    newBoard, depth - 1, alpha, beta, heuristic, False
                )
                
                if eval > maxEval:
                    maxEval = eval
                    bestMove = move  
                
                alpha = max(alpha, eval)
                
                if beta <= alpha:
                    break
            
            return maxEval, bestMove
        
        else:
            minEval = math.inf
            bestMove = None
            for move in possibleMoves:
                newBoard = ConnectFourBoard()
                newBoard.board = [row[:] for row in board.board]
                
                newBoard.makeMove(move, 1)
                
                eval, _ = self.minimaxAlphaBetaPruning(
                    newBoard, depth - 1, alpha, beta, heuristic, True
                )
                
                if eval < minEval:
                    minEval = eval
                    bestMove = move  
                beta = min(beta, eval)
                if beta <= alpha:
                    break
            return minEval, bestMove
