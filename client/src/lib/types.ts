import { LucideIcon } from "lucide-react";
import { PIECE, heuristicMap } from "./consts";

export type GameMode = {
    name: string,
    link: string,
    Icon1: LucideIcon,
    Icon2: LucideIcon,
};

export type Player = "Human" | "CPU" | "MM Piecese" | "MM Positions";

export type ObjectValues<T> = T[keyof T];

export type Piece = ObjectValues<typeof PIECE>;

export type ResponseMessage = "You win!" | "You lose!" | "Tie!" | "Game continues" | "Minimax pieces wins!" | "Minimax positions wins!";

export type Heuristic = keyof typeof heuristicMap;
export type HeuristicName = (typeof heuristicMap)[Heuristic];


export type Move = {
    row: number,
    col: number,
};

export type Cell = {
    value: Piece,
    highlight: boolean,
}

export type MakeMoveResponse = {
    success: boolean,
    message: ResponseMessage,
    board: unknown[][],
    sequence?: Move[]
};

export type GetMoveResponse = MakeMoveResponse