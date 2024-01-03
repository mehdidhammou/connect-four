import Column from "@/components/board/column";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  GetMoveResponse,
  Heuristic,
  Move,
  Piece,
  ResponseMessage,
} from "@/lib/types";
import { createEmptyBoard, restart, transpose } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
type BoardProps = {
  toggleTurn: () => void;
  starter: Heuristic;
};

const AutoBoard = ({ toggleTurn, starter }: BoardProps) => {
  const [currentHeuristic, setCurrentHeuristic] = useState<Heuristic>(starter);
  const [board, setBoard] = useState(createEmptyBoard());
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<ResponseMessage>("Game continues");
  const [sequence, setSequence] = useState<Move[]>([]);

  const fetchMove = async () => {
    try {
      const BotMoveResponse = await fetch("http://localhost:5000/get_move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heuristic: currentHeuristic,
          board: board,
        }),
      });

      const BotMoveData: GetMoveResponse = await BotMoveResponse.json();

      // turn all the board elements to ints and update the board
      setBoard(() => {
        return BotMoveData.board.map((row) =>
          // @ts-expect-error ignore
          row.map((el: string) => parseInt(el))
        ) as Piece[][];
      });

      if (BotMoveData.message !== "Game continues") {
        setGameOver(true);
        
        if (BotMoveData.sequence) {
          setSequence(BotMoveData.sequence);
        }
        
        setMessage(BotMoveData.message);
        
        await new Promise((r) => setTimeout(r, 1000));
        
      }
    } catch (error) {
      console.error("Failed to get bot move");
      return;
    }
  };

  useEffect(() => {
    let id: number;

    const fetchAndUpdate = async () => {
      if (!gameOver) {
        try {
          await fetchMove();
          toggleTurn();
          setCurrentHeuristic((prev) => (3 - prev) as Heuristic);
        } catch (error) {
          console.error("Failed to get bot move", error);
        }
      }
    };

    if (!gameOver) {
      id = setInterval(fetchAndUpdate, 1500);
    }

    return () => clearInterval(id);
  }, [board]);

  return (
    <>
      <div className="flex items-center justify-center">
        {transpose(board).map((col, index) => (
          <Column
            key={index}
            column={col}
            colIdx={index}
            sequence={sequence}
            onClick={() => {}}
            disabled
          />
        ))}
      </div>
      {gameOver && (
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Game over</DialogTitle>
            </DialogHeader>
            {message === "Tie!" ? (
              <div className="flex flex-col items-center justify-center max-w-sm gap-4 p-8 bg-yellow-100 rounded-md">
                <p className="font-bold">{message}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-8 bg-green-100 rounded-md">
                <Check />
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

export default AutoBoard;
