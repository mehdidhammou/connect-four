from abc import ABC, abstractmethod
from classes.board import ConnectFourBoard


class Heuristic(ABC):
    def __init__(self, id: int):
        self.id = id

    @abstractmethod
    def evaluate(board: ConnectFourBoard, piece: int) -> int:
        pass
