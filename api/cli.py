import random

from classes.Play import Play


def main():
    # board = ConnectFo034urBoard.ConnectFourBoard()

    game = Play()
    board = game.board
    # board.drawBoard()

    print(board.getPossibleMoves())

    # randomMove = random.choice(board.getPossibleMoves())1

    # print(randomMove)
    game.computerTurn()
    board.drawBoard()
    while not board.gameOver():
        game.humanTurn()
        print(board.heuristicEval(1))
        board.drawBoard()
        if board.gameOver():
            break
        cpumove = game.computerTurn()
        print(cpumove)
        game.board.makeMove(cpumove, 2)
        print(board.heuristicEval(2))
        board.drawBoard()
    # game.humanTurn()
    # board.drawBoard()

    print(board.heuristicEval(1))
    print(board.getPossibleMoves())
    # print(board.win(2))
    if board.win(2):
        print("hahaha  you lost against a stupid heuristic")
    # print(board.win(1))
    if board.win(1):
        print("you win, boring")
    print(board.gameOver())


if __name__ == "__main__":
    main()
