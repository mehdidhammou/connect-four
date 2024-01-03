from flask import Flask, jsonify, request
from classes.Play import Play
from classes.response import Response
from classes.move import Move
from flask_cors import CORS
from enum import Enum

app = Flask(__name__)
CORS(app)

# Initialize Connect Four game
game = Play()
board = game.board

res_messages = {
    "win": "You win!",
    "lose": "You lose!",
    "tie": "Tie!",
    "continue": "Game continues",
    "mm_pos_win": "Minimax positions wins!",
    "mm_piece_win": "Minimax pieces wins!",
}

players = {
    "human": 1,
    "cpu": 2,
}


@app.route("/")
def index():
    return jsonify(board.board)


# define a function where it takes the board and the cpu (1 or 2) and return the new board after the move by the cpu
@app.route("/get_move", methods=["POST"])
def get_move():
    data = request.get_json()
    heuristic: int = data.get("heuristic")
    currentBoard: list[list[int]] = data.get("board")

    game.board.board = currentBoard

    best_move = game.computerTurn(heuristic=heuristic)

    print(game.board.getPossibleMoves())
    print(best_move)
    game.board.makeMove(best_move, piece=heuristic)

    response = Response(
        board=game.board.board,
        message=res_messages["continue"],
    )
    # Check game status after the bot's move
    if result := game.board.win(1):
        response.message = res_messages["mm_piece_win"]
        response.sequence = result
    elif result := game.board.win(2):
        response.message = res_messages["mm_pos_win"]
        response.sequence = result
    elif not game.board.getPossibleMoves():
        response.message = res_messages["tie"]

    return jsonify(response.__dict__)


@app.route("/make_move", methods=["POST"])
def make_move():
    data = request.get_json()
    heuristic: int = data.get("heuristic")
    row: int = data.get("row")
    col: int = data.get("col")
    piece: int = data.get("piece")
    currentBoard: list[list[int]] = data.get("board")

    game.board.board = currentBoard

    # # Make a move
    game.board.makeMove({"col": col, "row": row}, piece)

    response = Response(
        board=game.board.board,
        message=res_messages["continue"],
    )

    # Check game status after the move
    result = game.board.win(1)
    if result:
        response.sequence = result
        response.message = res_messages["win"]
    elif not game.board.getPossibleMoves():
        response.message = res_messages["tie"]
        return jsonify(response.__dict__)

    # Let the bot make its move
    best_move = game.computerTurn(heuristic=heuristic)
    print(best_move)
    game.board.makeMove(best_move, 2)

    response.board = game.board.board
    result = game.board.win(2)
    if result:
        response.sequence = result
        response.message = res_messages["lose"]
    elif not game.board.getPossibleMoves():
        response.message = res_messages["tie"]

    return jsonify(response.__dict__)


if __name__ == "__main__":
    app.run(debug=True)
