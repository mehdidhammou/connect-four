import { Piece } from "@/lib/types";
import Cell from "./cell";

type ColumnProps = {
  column: Piece[];
  colIdx: number;
  onClick: (column: number) => Promise<void>;
  disabled: boolean;
};

const Column = ({ column,colIdx, onClick, disabled }: ColumnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(colIdx)}
      className="flex flex-col gap-2 p-2 transition rounded-full disabled:opacity-50 enabled:hover:bg-blue-100"
    >
      {column.map((value, index) => (
        <Cell key={index} value={value} />
      ))}
    </button>
  );
};

export default Column;
