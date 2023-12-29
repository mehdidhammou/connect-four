import { Piece } from "@/lib/types";
import Cell from "./Cell";

type ColumnProps = {
  column: Piece[];
  onClick: (column: Piece[]) => Promise<void>;
  disabled: boolean;
};

const Column = ({ column, onClick, disabled }: ColumnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(column)}
      className="flex flex-col gap-2 p-2 transition rounded-full disabled:opacity-50 hover:bg-blue-100"
    >
      {column.map((value, index) => (
        <Cell key={index} value={value} />
      ))}
    </button>
  );
};

export default Column;
