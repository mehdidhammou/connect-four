import math
from classes.ConnectFourBoard import ConnectFourBoard


class Play:
    def __init__(self):
        self.board = ConnectFourBoard()

    def humanTurn(self):
        while True:
            try:
                col = int(input("Enter your move (column 1-7): "))
                col = col - 1
                possible_moves = [move[1] for move in self.board.getPossibleMoves()]
                if col in possible_moves:
                    row = self.findLowestEmptyRow(col)
                    self.board.makeMove(row, col, 1)
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

    def computerTurn(self, piece=2):
        depth = 4
        _, col = self.minimaxAlphaBetaPruning(
            self.board, depth, -math.inf, math.inf, 1, True
        )
        row = self.findLowestEmptyRow(col)
        self.board.makeMove(row, col, piece)
        return row, col, 2

    def computerTurn2(self, piece=2):
        depth = 4
        _, col = self.minimaxAlphaBetaPruning(
            self.board, depth, -math.inf, math.inf, 2, True
        )
        row = self.findLowestEmptyRow(col)
        self.board.makeMove(row, col, piece)
        return row, col, 2

    def minimaxAlphaBetaPruning(
        self, board, depth, alpha, beta, heuristic, maximizingPlayer
    ):
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
                row = self.findLowestEmptyRow(
                    move[1]
                )  # Extract the column from the tuple
                newBoard.makeMove(row, move[1], 2)  # Extract the column from the tuple
                eval, _ = self.minimaxAlphaBetaPruning(
                    newBoard, depth - 1, alpha, beta, heuristic, False
                )
                if eval > maxEval:
                    maxEval = eval
                    bestMove = move[1]  # Extract the column from the tuple
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
                row = self.findLowestEmptyRow(
                    move[1]
                )  # Extract the column from the tuple
                newBoard.makeMove(row, move[1], 1)  # Extract the column from the tuple
                eval, _ = self.minimaxAlphaBetaPruning(
                    newBoard, depth - 1, alpha, beta, heuristic, True
                )
                if eval < minEval:
                    minEval = eval
                    bestMove = move[1]  # Extract the column from the tuple
                beta = min(beta, eval)
                if beta <= alpha:
                    break
            return minEval, bestMove
