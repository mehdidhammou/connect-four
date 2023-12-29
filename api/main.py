from flask import Flask, jsonify, request
from classes.Play import Play
from flask_cors import CORS
from enum import Enum

app = Flask(__name__)
CORS(app)

# Initialize Connect Four game
game = Play()
board = game.board


class MakeMoveResponseMessage(Enum):
    WIN = "You win!"
    LOSE = "You lose!"
    TIE = "Tie!"
    CONTINUE = "Game continues"


@app.route("/")
# def index():
#     return "Welcome to Connect Four!"
# define a function where the board is returned as a JSON object
def index():
    return jsonify(board.board)


@app.route("/get_move", methods=["POST"])
# define a function where it takes the board and the cpu (1 or 2) and return the new board after the move by the cpu
def get_move():
    data = request.get_json()
    cpu = data.get("cpu")
    currentBoard = data.get("board")

    game.board.board = currentBoard

    if cpu == 1:  # if the cpu is 1, then it is the MM pieces
        row, col, piece = game.computerTurn(cpu)
    else:  # if the cpu is 2, then it is the MM positions
        row, col, piece = game.computerTurn2(cpu)

    # Check game status after the bot's move
    result = game.board.gameOver()
    if result:
        if game.board.win(1):
            return jsonify({"success": True, "message": "MM pieces win!"})
        elif game.board.win(2):
            return jsonify(
                {
                    "success": True,
                    "message": "MM positions win!",
                    "board": game.board.board,
                }
            )
        else:
            return jsonify({"success": True, "message": "Tie!"})

    return jsonify(
        {
            "success": True,
            "message": "Game continues",
            "row": row,
            "col": col,
            "piece": piece,
            "board": game.board.board,
        }
    )


@app.route("/make_move", methods=["POST"])
def make_move():
    data = request.get_json()
    cpu = data.get("cpu")
    row = data.get("row")
    col = data.get("col")
    piece = data.get("piece")
    currentBoard = data.get("board")

    game.board.board = currentBoard
    # # Make a move
    game.board.makeMove(row, col, piece)

    # if not success:
    #     return jsonify({'error': 'Invalid move'}), 400

    # Check game status after the move
    result = game.board.gameOver()
    if result:
        if game.board.win(1):
            return jsonify({"success": True, "message": "You win!"})
        elif game.board.win(2):
            return jsonify(
                {"success": True, "message": "You lose!", "board": game.board.board}
            )
        else:
            return jsonify({"success": True, "message": "Tie!"})

    # Let the bot make its move
    if cpu == 1:
        row, col, piece = game.computerTurn()
    else:
        row, col, piece = game.computerTurn2()

    # Check game status after the bot's move
    result = game.board.gameOver()
    message = MakeMoveResponseMessage.CONTINUE
    if result:
        if game.board.win(1):
            message = MakeMoveResponseMessage.WIN
        elif game.board.win(2):
            message = MakeMoveResponseMessage.LOSE
        else:
            message = MakeMoveResponseMessage.TIE

    return jsonify(
        {
            "success": True,
            "message": message.value,
            "row": row,
            "col": col,
            "piece": piece,
            "board": game.board.board,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
