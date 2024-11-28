from abc import ABC, abstractmethod
from ..board import ConnectFourBoard
from ..move import Move


class Solver(ABC):
    @abstractmethod
    def solve(self, board: ConnectFourBoard) -> Move:
        pass
