import { Move, Piece } from "@/lib/types";
import Cell from "./cell";

type ColumnProps = {
  column: Piece[];
  colIdx: number;
  onClick: (column: number) => void;
  disabled: boolean;
  sequence: Move[];
};

const Column = ({
  column,
  colIdx,
  onClick,
  disabled,
  sequence,
}: ColumnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(colIdx)}
      className="flex flex-col gap-2 p-2 transition rounded-full disabled:opacity-50 enabled:hover:bg-blue-100"
    >
      {column.map((val, index) => (
        <Cell
          key={index}
          value={val}
          highlight={sequence?.some(
            (move) => move.col === colIdx && move.row === index
          )}
        />
      ))}
    </button>
  );
};

export default Column;
