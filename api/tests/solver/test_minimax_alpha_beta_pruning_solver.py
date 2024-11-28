import unittest
from src.classes.solver import MinimaxAlphaBetaPruningSolver
from src.classes.board.connect_four_board import ConnectFourBoard
from src.classes.heuristic import CountPositionsHeuristic
from src.classes.move import Move


class TestMinimaxAlphaBetaPruningSolver(unittest.TestCase):

    def setUp(self):
        self.heuristic = CountPositionsHeuristic(id=1)
        self.solver = MinimaxAlphaBetaPruningSolver(heuristic=self.heuristic, depth=4)
        self.board = ConnectFourBoard()

    def test_minimax_alpha_beta_pruning_max_player(self):
        self.board.state = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 2, 2, 2],
        ]
        move = self.solver.solve(board=self.board)
        expected_move: Move = {"col": 0, "row": 4}
        self.assertEqual(move, expected_move)

    def test_minimax_alpha_beta_pruning_min_player(self):
        self.board.state = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 2, 2, 2],
        ]
        move = self.solver.solve(board=self.board)
        expected_move: Move = {"col": 0, "row": 4}
        self.assertEqual(move, expected_move)
