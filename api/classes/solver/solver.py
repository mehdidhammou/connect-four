from abc import ABC, abstractmethod
from classes.board import ConnectFourBoard
from classes.move import Move

class Solver(ABC):
    @abstractmethod
    def solve(self, board: ConnectFourBoard) -> Move:
        pass
