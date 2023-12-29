import { Piece } from "@/lib/types";

const Cell = ({ value }: { value: Piece }) => {
  const colorClass =
    value === 1 ? "bg-red-400" : value === 2 ? "bg-yellow-400" : "bg-gray-400";
  return <div className={`w-16 h-16 rounded-full ${colorClass}`} />;
};

export default Cell;
