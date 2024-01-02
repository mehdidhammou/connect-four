// import { boardShape } from "@/lib/consts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heuristic,
  MakeMoveResponse,
  Move,
  Piece,
  Player,
  ResponseMessage,
} from "@/lib/types";
import { createEmptyBoard, restart, transpose } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Column from "./column";
import { PIECE } from "@/lib/consts";

type BoardProps = {
  heuristic: Heuristic;
  toggleTurn: () => void;
  selectedStarter: Player | undefined;
};

const Board = ({ heuristic, toggleTurn, selectedStarter }: BoardProps) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<ResponseMessage>("Game continues");
  const [sequence, setSequence] = useState<Move[]>([]);
  const [canIChoose, setCanIChoose] = useState(true);

  useEffect(() => {
    if (selectedStarter === "CPU") {
      if (heuristic === 1) {
        makeMove(0, PIECE.Cpu);
      } else if (heuristic === 2) {
        makeMove(3, PIECE.Cpu);
      }
      toggleTurn();
    }

    return () => toggleTurn();
  }, []);

  const makeMove = (colIdx: number, piece: Piece): number => {
    const testBoard = transpose(board);

    // if the column is full, return -1
    if (testBoard[colIdx].every((cell) => cell !== 0)) return -1;

    // find the first empty cell in the column
    const row = testBoard[colIdx].lastIndexOf(PIECE.Empty);

    testBoard[colIdx][row] = piece;
    setBoard(transpose(testBoard));

    return row;
  };

  const handleColumnClick = async (col: number) => {
    if (gameOver) return;

    const row = makeMove(col, PIECE.Player);

    // cpu's turn
    toggleTurn();

    setCanIChoose(false);

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
            heuristic: heuristic,
            row: row,
            col: col,
            piece: 1,
            board: board,
          }),
        }
      );

      const playerMoveData: MakeMoveResponse = await playerMoveResponse.json();

      // @ts-expect-error ignore
      setBoard(playerMoveData.board);

      // player's turn
      toggleTurn();

      if (playerMoveData.message != "Game continues") {
        if (playerMoveData.sequence) {
          setSequence(playerMoveData.sequence);
        }
        // sleep for 1 second
        await new Promise((r) => setTimeout(r, 1000));
        setGameOver(true);
        setMessage(playerMoveData.message);
      }
    } catch (error) {
      console.error("Error handling player move:", error);
      alert("couldn't connect to the server");
    }
    setCanIChoose(true);
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        {transpose(board).map((col, index) => (
          <Column
            key={index}
            colIdx={index}
            sequence={sequence}
            column={col}
            onClick={handleColumnClick}
            disabled={
              !canIChoose || col.every((cell) => cell !== 0) || gameOver
            }
          />
        ))}
      </div>
      {gameOver && (
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Game over</DialogTitle>
            </DialogHeader>
            {message === "You win!" ? (
              <div className="flex flex-col items-center justify-center gap-4 p-8 bg-green-100 rounded-md">
                <Check />
                <p className="font-bold">{message}</p>
              </div>
            ) : message === "You lose!" ? (
              <div className="flex flex-col items-center justify-center gap-4 p-8 bg-red-100 rounded-md">
                <AlertCircle />
                <p className="font-bold">{message}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-8 bg-yellow-100 rounded-md">
                <p className="font-bold">{message}</p>
              </div>
            )}
            <Separator />
            <DialogFooter>
              <Button className="w-full" onClick={() => restart()}>
                Restart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Board;
