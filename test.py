from enum import Enum, auto


class GameState(Enum):
    WIN = "You win!"
    LOSE = "You lose!"
    TIE = "It's a tie!"
    CONTINUE = "Continue"
    MM_POS_WIN = "Positions Heuristic wins!"
    MM_PIECE_WIN = "Pieces Heuristic wins!"

    def __eq__(self, other):
        if isinstance(other, str):
            return self.value == other
        elif isinstance(other, GameState):
            return self.name == other.name
        else:
            return False

    def __ne__(self, other):
        return not self.__eq__(other)


print(GameState.MM_POS_WIN.name == GameState.MM_PIECE_WIN.name)
