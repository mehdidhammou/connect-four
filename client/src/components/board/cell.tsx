import { Piece } from "@/lib/types";
import { cn } from "@/lib/utils";

const Cell = ({
  isBottom,
  value,
  highlight = false,
}: {
  isBottom: boolean;
  value: Piece;
  highlight: boolean;
}) => {
  const colorClass =
    value === 1 ? "bg-red-400" : value === 2 ? "bg-yellow-400" : "bg-gray-400";
  return (
    <div
      className={cn(
        "cell w-16 h-16 rounded-full",
        colorClass,
        highlight && "border-4 border-green-500",
        isBottom && "hoverable"
      )}
    />
  );
};

export default Cell;
