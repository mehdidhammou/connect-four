from classes.move import Move
from math import inf


class ConnectFourBoard:
    def __init__(self):
        self.rows = 6
        self.cols = 7
        self.board = [[0] * self.cols for _ in range(self.rows)]

    def drawBoard(self):
        print("Board:")
        for row in self.board:
            print("|", end=" ")
            for cell in row:
                print(" " if cell == 0 else cell, end=" | ")
            print("\n" + "-" * (self.cols * 4 + 1))

    def getPossibleMoves(self) -> list[Move]:
        moves: list[Move] = []
        for col in range(self.cols):
            for row in range(self.rows - 1, -1, -1):
                if self.board[row][col] == 0:
                    moves.append({"col": col, "row": row})
                    break
        return moves

    def makeMove(self, move: Move, piece: int):
        if move in self.getPossibleMoves():
            self.board[move["row"]][move["col"]] = piece
        else:
            raise Exception("Invalid move")
            # pass

    def win(self, piece: int) -> list[Move] | None:
        # Check for horizontal wins

        for row in range(self.rows):
            for col in range(self.cols - 3):
                sequence = self.board[row][col : col + 4]
                if all(cell == piece for cell in sequence):
                    return [{"row": row, "col": col + i} for i in range(4)]

        # Check for vertical wins
        for row in range(self.rows - 3):
            for col in range(self.cols):
                sequence = [self.board[row + i][col] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    return [{"row": row + i, "col": col} for i in range(4)]

        # Check for diagonal wins (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                sequence = [self.board[row - i][col + i] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    return [{"row": row - i, "col": col + i} for i in range(4)]

        # Check for diagonal wins (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                sequence = [self.board[row + i][col + i] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    return [{"row": row + i, "col": col + i} for i in range(4)]

        return None

    def gameOver(self):
        return self.win(1) or self.win(2) or not self.getPossibleMoves()
    

    def heuristicEval(self, piece):
        
        if self.win(piece):
            return 999999
        if self.win(3 - piece):
            return -999999

        return self.evaluateBoard(piece)
        # return 0 
    
    def evaluateBoard(self, piece):
        score = 0
        # Evaluate based on consecutive pieces in rows
        for row in range(self.rows):
            for col in range(self.cols - 3):
                window = self.board[row][col : col + 4]
                score += self.evaluateWindow(window, piece)

        # Evaluate based on consecutive pieces in columns
        for col in range(self.cols):
            for row in range(self.rows - 3):
                window = [self.board[row + i][col] for i in range(4)]
                score += self.evaluateWindow(window, piece)

        # Evaluate based on consecutive pieces in diagonals (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row - i][col + i] for i in range(4)]
                score += self.evaluateWindow(window, piece)

        # Evaluate based on consecutive pieces in diagonals (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                window = [self.board[row + i][col + i] for i in range(4)]
                score += self.evaluateWindow(window, piece)

        return score

    def evaluateWindow(self, window, piece):
        if window.count(piece) == 3 and window.count(0) == 1:
            return 10  # Encourage completing a winning sequence
        elif window.count(piece) == 2 and window.count(0) == 2:
            return 5  # Encourage creating opportunities
        else:
            return 0


    def heuristicEval2(self, piece):
        # this heuristic is based on strategic positions on the board
        # the center is the most important position
        # the corners are the second most important position
        # the sides are the least important position

        if self.win(piece):
            return 100000
        if self.win(3 - piece):
            return -100000

        score = 0
        score += 4 * self.evaluateCenterControl(piece)
        score += 1 * self.evaluateCornerControl(piece)  # Give corners higher weight
        score += 0.5 * self.evaluateSideControl(piece)  # Give sides lower weight
        score += self.checkDoubleSideWin(piece)
        score += 20 * self.checkBlockingMove(piece)
        score += 1000 * self.checkWinningMove(piece)

        return score

    def checkDoubleSideWin(self, piece):
        opponent_piece = 3 - piece

        # Check for potential double-sided wins in rows
        for row in range(self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row][col + i] for i in range(4)]
                if (
                    window[1] == opponent_piece
                    and window[2] == opponent_piece
                    and window.count(0) == 2
                ):
                    return -1000  # Penalize the opponent for potential double-sided win

        # Check for potential double-sided wins in diagonals (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row - i][col + i] for i in range(4)]
                if (
                    window[1] == opponent_piece
                    and window[2] == opponent_piece
                    and window.count(0) == 2
                ):
                    return -1000

        # Check for potential double-sided wins in diagonals (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                window = [self.board[row + i][col + i] for i in range(4)]
                if (
                    window[1] == opponent_piece
                    and window[2] == opponent_piece
                    and window.count(0) == 2
                ):
                    return -1000

        return 0

    def evaluateCenterControl(self, piece):
        center_col = self.cols // 2
        center_count = 0

        for row in range(self.rows):
            if self.board[row][center_col] == piece:
                center_count += 1

        return center_count

    def evaluateCornerControl(self, piece):
        corner_count = 0

        if self.board[0][0] == piece:
            corner_count += 1
        if self.board[0][self.cols - 1] == piece:
            corner_count += 1
        if self.board[self.rows - 1][0] == piece:
            corner_count += 1
        if self.board[self.rows - 1][self.cols - 1] == piece:
            corner_count += 1

        return corner_count

    def evaluateSideControl(self, piece):
        side_count = 0

        for row in range(self.rows):
            if self.board[row][0] == piece:
                side_count += 1
            if self.board[row][self.cols - 1] == piece:
                side_count += 1

        for col in range(1, self.cols - 1):
            if self.board[0][col] == piece:
                side_count += 1
            if self.board[self.rows - 1][col] == piece:
                side_count += 1

        return side_count

    def checkBlockingMove(self, piece):
        # Check for potential blocking moves in rows
        for row in range(self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 50  # Encourage blocking opponent's winning move

        # Check for potential blocking moves in diagonals (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row - i][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 50

        # Check for potential blocking moves in diagonals (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                window = [self.board[row + i][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 50

        # Check for potential blocking moves in columns
        for col in range(self.cols):
            for row in range(self.rows - 3):
                window = [self.board[row + i][col] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 50

        return 0

    def checkWinningMove(self, piece):
        # Check for potential winning moves in rows
        for row in range(self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 100  # Encourage making winning move

        # Check for potential winning moves in diagonals (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                window = [self.board[row - i][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 100

        # Check for potential winning moves in diagonals (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                window = [self.board[row + i][col + i] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 100

        # Check for potential winning moves in columns
        for col in range(self.cols):
            for row in range(self.rows - 3):
                window = [self.board[row + i][col] for i in range(4)]
                if window.count(piece) == 3 and window.count(0) == 1:
                    return 100

        return 0
