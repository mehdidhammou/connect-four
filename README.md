# Connect Four Game: Human vs Computer (Minimax Algorithm)

This project presents a Connect Four game where a human player faces off against an AI opponent implemented using the minimax algorithm with alpha-beta pruning. The application comprises a Flask backend and a React frontend.

## Overview

This Connect Four game allows users to challenge the computer AI in a classic game. The game utilizes a Flask backend to manage game logic and provide API endpoints, while the React frontend offers a user-friendly interface.

## Setup

### Prerequisites

- Node.js and npm for running the React frontend.
- Python with pip for the Flask backend.

### Installation

1. **Backend (Flask)**:
   - Navigate to the `api` directory and set up a virtual environment.
   - Install the required dependencies using `pip install -r requirements.txt`.
   - Run the Flask server using `python main.py`.

2. **Frontend (React)**:
   - Navigate to the `client` directory.
   - Install frontend dependencies using `npm install` or `pnpm install`.
   - Start the React development server using `npm dev`.

### Usage

- Access the application in your web browser by visiting `http://localhost:3000`.
- Play against the computer AI by following the on-screen instructions.
- The AI opponent uses the minimax algorithm with alpha-beta pruning for intelligent moves.
- API calls to the Flask backend handle game moves and updates.

## Contributing

Contributions are welcome! Please feel free to open issues or pull requests for bug fixes, improvements, or additional features.

## License

This project is licensed under the [MIT License](link_to_license).