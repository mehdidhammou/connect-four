// import { boardShape } from "@/lib/consts";
import { MakeMoveResponse, Piece, Player } from "@/lib/types";
import { createEmptyBoard, restart, transpose } from "@/lib/utils";
import { useEffect, useState } from "react";
import Column from "./column";

type BoardProps = {
  whichCpu: 1 | 2;
  toggleTurn: () => void;
  selectedStarter: Player | undefined;
};

const Board = ({ whichCpu, toggleTurn, selectedStarter }: BoardProps) => {
  const [board, setBoard] = useState(createEmptyBoard());

  const [canIChoose, setCanIChoose] = useState(true);

  useEffect(() => {
    let col = null;
    if (selectedStarter === "CPU" && whichCpu === 1) {
      col = 0; // the heuristic always starts from the left
    } else if (selectedStarter === "CPU" && whichCpu === 2) {
      col = 3; // the heuristic always starts from the middle
    }

    if (col !== null) {
      setBoard(makeMove(board, col, 2).newBoard);
    }
  }, []);

  const makeMove = (
    board: Piece[][],
    colIdx: number,
    piece: Piece
  ): { newBoard: Piece[][]; cell: number } => {
    const testBoard = transpose(board);

    if (testBoard[colIdx].every((cell) => cell !== 0))
      return { newBoard: board, cell: -1 };


    const cell = testBoard[colIdx].lastIndexOf(0);

    testBoard[colIdx][cell] = piece;

    toggleTurn();

    return { newBoard: transpose(testBoard), cell };
  };

  const handleColumnClick = async (col: number) => {
    const { newBoard, cell } = makeMove(board, col, 1);
    setCanIChoose(false);
    setBoard(newBoard);
    try {
      // Post the player's move to the server
      const playerMoveResponse = await fetch(
        "http://localhost:5000/make_move",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpu: whichCpu,
            row: cell,
            col: col,
            piece: 1,
            board: board,
          }),
        }
      );

      const playerMoveData: MakeMoveResponse = await playerMoveResponse.json();
      console.log("Player move data:", playerMoveData);

      setBoard(playerMoveData.board);

      toggleTurn();

      if (playerMoveData.message != "Game continues") {
        alert(playerMoveData.message);
        restart();
      }
    } catch (error) {
      console.error("Error handling player move:", error);
      alert("couldn't connect to the server");
    }
    setCanIChoose(true);
  };

  return (
    <div className="flex items-center justify-center ">
      {/* Render the columns */}
      {transpose(board).map((col, index) => (
        <Column
          key={index}
          colIdx={index}
          column={col}
          onClick={handleColumnClick}
          disabled={!canIChoose || col.every((cell) => cell !== 0)}
        />
      ))}
    </div>
  );
};

export default Board;
