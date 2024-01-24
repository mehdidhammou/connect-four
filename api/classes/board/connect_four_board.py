from classes.move import Move


class ConnectFourBoard:
    def __init__(self, initial_state: list[list[int]] = None):
        self.rows = 6
        self.cols = 7
        self.winning_sequence = []

        if initial_state:
            if len(initial_state) != self.rows or len(initial_state[0]) != self.cols:
                raise ValueError(
                    f"Initial state shape is incorrect. Expected shape: ({self.rows}, {self.cols})"
                )
            self.state = [[_ for _ in row] for row in initial_state]

        else:
            self.state = [[0 for _ in range(self.cols)] for _ in range(self.rows)]

    def make_move(self, move: Move, piece: int) -> None:
        if move not in self.get_possible_moves():
            raise ValueError("Invalid move")

        self.state[move["row"]][move["col"]] = piece

    def get_possible_moves(self) -> list[Move]:
        moves: list[Move] = []
        for col in range(self.cols):
            for row in range(self.rows - 1, -1, -1):
                if self.state[row][col] == 0:
                    moves.append({"col": col, "row": row})
                    break
        return moves

    def has_won(self, piece: int) -> bool:
        # Check for horizontal wins
        for row in range(self.rows):
            for col in range(self.cols - 3):
                sequence = self.state[row][col : col + 4]
                if all(cell == piece for cell in sequence):
                    self.winning_sequence = [
                        {"row": row, "col": col + i} for i in range(4)
                    ]
                    return True

        # Check for vertical wins
        for row in range(self.rows - 3):
            for col in range(self.cols):
                sequence = [self.state[row + i][col] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    self.winning_sequence = [
                        {"row": row + i, "col": col} for i in range(4)
                    ]
                    return True

        # Check for diagonal wins (bottom-left to top-right)
        for row in range(3, self.rows):
            for col in range(self.cols - 3):
                sequence = [self.state[row - i][col + i] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    self.winning_sequence = [
                        {"row": row - i, "col": col + i} for i in range(4)
                    ]
                    return True

        # Check for diagonal wins (top-left to bottom-right)
        for row in range(self.rows - 3):
            for col in range(self.cols - 3):
                sequence = [self.state[row + i][col + i] for i in range(4)]
                if all(cell == piece for cell in sequence):
                    self.winning_sequence = [
                        {"row": row + i, "col": col + i} for i in range(4)
                    ]
                    return True

        return None
