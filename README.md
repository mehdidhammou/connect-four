# Connect Four Game: Human vs Computer (Minimax Algorithm)

This project presents a Connect Four game where a human player faces off against an AI opponent implemented using the minimax algorithm with alpha-beta pruning with two heuristics.

### 1. Count pieces heuristic

The first heuristic is based on the number of pieces on the board. The AI will try to maximize the number of its pieces on the board while minimizing the number of the human player's pieces.

### 2. Count winning positions heuristic

The second heuristic is based on the number of winning positions on the board. The AI will try to maximize the number of winning positions it has while minimizing the number of winning positions the human player has.

## Overview

This Connect Four game allows users to challenge the computer AI in a classic game. The game utilizes a Flask backend to manage game logic and provide API endpoints, while the React frontend offers a user-friendly interface.

### Setup

#### Run the docker compose file

```bash
docker compose up
```

This will build two images, the frontend and the backend, and run them in two separate containers. The frontend will be available at `http://localhost:8000` and the backend at `http://localhost:5000`.

### Usage

Open the frontend in a web browser at `http://localhost:8000` and simply follow the instructions to play the game.

### Objective

The objective of the game is to connect four of your own discs in a row, either horizontally, vertically, or diagonally, before your opponent does.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to open issues or pull requests for bug fixes, improvements, or additional features.

Special thanks for [Ahmed Belloula](https://github.com/Ahmed-dev-code)
