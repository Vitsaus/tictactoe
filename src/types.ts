export type GameBoard = string[][];

export interface GameResult {
    finished: boolean;
    winner: string;
}

export interface Game {
    board: GameBoard;
    result: GameResult;
}

export interface CheckResult {
    winner: string;
}
