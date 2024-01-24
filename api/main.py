from classes import (
    ConnectFourBoard,
    Game,
    HeuristicFactory,
    MinimaxAlphaBetaPruningSolver,
    Response,
)
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return jsonify(ConnectFourBoard().state)


# define a function where it takes the board and the cpu (1 or 2) and return the new board after the move by the cpu
@app.route("/get_move", methods=["POST"])
def get_move():
    data = request.get_json()
    heuristic = data.get("heuristic")
    currentBoard: list[list[int]] = data.get("board")

    heuristic = HeuristicFactory.create_heuristic(heuristic=heuristic)
    solver = MinimaxAlphaBetaPruningSolver(heuristic=heuristic, depth=4)
    board = ConnectFourBoard(initial_state=currentBoard)

    game = Game(
        board=board,
        solver=solver,
        cpu_vs_cpu=True,
    )

    print(heuristic.id)
    game.play(piece=heuristic.id)

    response = Response(
        success=True,
        board=game.board.state,
        state=game.state.name,
        message=game.state.value,
        sequence=game.board.winning_sequence,
    )

    return jsonify(response.__dict__)


@app.route("/make_move", methods=["POST"])
def make_move():
    data = request.get_json()
    heuristic = data.get("heuristic")
    currentBoard: list[list[int]] = data.get("board")

    heuristic = HeuristicFactory.create_heuristic(heuristic=heuristic)
    solver = MinimaxAlphaBetaPruningSolver(heuristic=heuristic, depth=4)
    board = ConnectFourBoard(initial_state=currentBoard)

    game = Game(
        board=board,
        solver=solver,
        cpu_vs_cpu=False,
    )

    response = Response(
        success=True,
        board=game.board.state,
        state=game.state.name,
        message=game.state.value,
        sequence=game.board.winning_sequence,
    )

    if game.is_over():
        return jsonify(response.__dict__)

    # Let the bot make its move
    game.play(piece=2)

    response.message = game.state.value
    response.board = game.board.state
    response.state = game.state.name
    response.sequence = game.board.winning_sequence

    return jsonify(response.__dict__)


if __name__ == "__main__":
    app.run(debug=True)
