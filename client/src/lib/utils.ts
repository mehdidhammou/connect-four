import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Piece } from "./types";
import { boardShape } from "./consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transpose(matrix: Piece[][]): Piece[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function restart() {
  window.location.reload();
}

export function createEmptyBoard(rows: number = boardShape.rows, cols: number = boardShape.cols): Piece[][] {
  return Array(rows).fill(0).map(() => Array(cols).fill(0));
}
