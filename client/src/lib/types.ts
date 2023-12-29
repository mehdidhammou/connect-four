import { LucideIcon } from "lucide-react";
import { PIECE } from "./consts";

export type Player = "Human" | "CPU";

export type GameMode = {
    name: string,
    link: string,
    Icon1: LucideIcon,
    Icon2: LucideIcon,
};

export type ObjectValues<T> = T[keyof T];

export type Piece = ObjectValues<typeof PIECE>;

export type ResponseMessage = "You win!" | "You lose!" | "Tie!" | "Game continues";

export type MakeMoveResponse = {
    sucess: boolean,
    message: ResponseMessage,
    row: number,
    col: number,
    piece: Piece,
    board: Piece[][],
};