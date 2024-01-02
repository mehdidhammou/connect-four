from classes.move import Move


class Response:
    def __init__(
        self,
        message: str,
        board: list[list[int]],
        sequence: list[Move] = None,
        success: bool = True,
    ):
        self.message = message
        self.board = board
        self.sequence = sequence
        self.success = success

    def __repr__(self):
        return f"Response(message={self.message}, board={self.board}, sequence={self.sequence}, success={self.success})"

    def __str__(self):
        return f"Response(message={self.message}, board={self.board}, sequence={self.sequence}, success={self.success})"