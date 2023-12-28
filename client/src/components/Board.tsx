// Board.js

import { useState } from "react";
import Column from "./Column";

const Board = ({ whichCpu, setTurn, selectedStarter }) => {
  console.log(selectedStarter);
  const initialBoardState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  if (selectedStarter === "CPU") {
    // make a random move for the CPU
    //  const randomCol = Math.floor(Math.random() * 7)

    initialBoardState[5][3] = 2;
  }
  console.log(initialBoardState);

  // fetch the initial board state from the server

  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  const [board, setBoard] = useState(transpose(initialBoardState));
  const [canIChoose, setCanIChoose] = useState(true);

  const handleColumnClick = async (col) => {
    if (col.every((cell) => cell !== 0)) return alert("Column is full!");

    if (!canIChoose) {
      return;
    } else {
      setCanIChoose(false);
      setTurn("CPU");

      // Find the last empty cell in the column
      const emptyCell = col.lastIndexOf(0);

      // If the column is full, do nothing
      if (emptyCell === -1) return;

      // Create a new column array with the new value
      const newCol = [...col];
      newCol[emptyCell] = 1;

      // Create a new board array with the new column
      const newBoard = [...board];
      newBoard[board.indexOf(col)] = newCol;

      setBoard(newBoard);
      let untransposedBoard;

      try {
        // Post the player's move to the server
        untransposedBoard = transpose(board);
        const playerMoveResponse = await fetch(
          "http://localhost:5000/make_move",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cpu: whichCpu,
              row: emptyCell,
              col: board.indexOf(col),
              piece: 1,
              board: untransposedBoard,
            }),
          }
        );

        if (!playerMoveResponse.ok) {
          console.error("Failed to make player move");
          return;
        }

        const playerMoveData = await playerMoveResponse.json();
        setTurn("CPU");
        console.log("Player move data:", playerMoveData);

        if (playerMoveData.message === "You win!") return alert("You win!");
        else if (playerMoveData.message === "You lose!") {
          setBoard(transpose(playerMoveData.board));
          return alert("You lose!");
        } else if (playerMoveData.message === "Tie!") return alert("Tie!");
        setBoard(transpose(playerMoveData.board));
        setTurn("Player");
      } catch (error) {
        console.error("Error handling player move:", error);
        alert("couldn't connect to the server");
      }
      setTurn("Player");
      setCanIChoose(true);
    }
    // Now, it's time for the computer's move
    // Add logic to handle the computer's move and update the board similarly
  };

  return (
    <div className="board">
      {/* Render the columns */}
      {board.map((col, index) => (
        <Column
          key={index}
          colum={col}
          onClick={handleColumnClick}
          disabled={!canIChoose}
        />
      ))}
    </div>
  );
};

export default Board;
