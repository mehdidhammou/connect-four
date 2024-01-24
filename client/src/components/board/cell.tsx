import { Piece } from "@/lib/types";
import { cn } from "@/lib/utils";

const Cell = ({
  value,
  highlight = false,
}: {
  value: Piece;
  highlight: boolean;
}) => {
  const colorClass =
    value === 1 ? "bg-red-400" : value === 2 ? "bg-yellow-400" : "bg-zinc-500";
  return (
    <div
      className={cn(
        "w-16 h-16 rounded-full",
        colorClass,
        highlight && "border-4 border-green-500"
      )}
    />
  );
};

export default Cell;
