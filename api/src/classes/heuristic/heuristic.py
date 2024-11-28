from abc import ABC, abstractmethod
from ..board.connect_four_board import ConnectFourBoard


class Heuristic(ABC):
    def __init__(self, id: int):
        self.id = id

    @abstractmethod
    def evaluate(board: ConnectFourBoard, piece: int) -> int:
        pass
