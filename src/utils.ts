import {GameBoard, Game, GameResult, CheckResult} from "./types";
import {MoveEntity} from "./entities/MoveEntity";

export function createGame(width: number, height: number, moves: MoveEntity[]): Game {
    const board = createBoard(width, height);
    moves.forEach((move) => {
       board[move.y][move.x] = move.value;
    });
    return {
        board,
        result: {
            finished: false,
            winner: '',
        }
    }
}

export function createBoard(width: number, height: number): GameBoard  {
    const board = [];
    for (let h = 0; h < height; h++) {
        let row = [];
        for (let w = 0; w < width; w++) {
            row.push('');
        }
        board.push(row);
    }
    return board;
}

export function mark(board: GameBoard, x: number, y: number, v: string): boolean {
    let marked = false;
    if (board[y] && board[y][x] === '') {
        board[y][x] = v;
        marked = true;
    }
    //console.log('updated board', board);
    return marked;
}

export function checkForResult(board: GameBoard, maxRequired: number): GameResult {

    let current = "";
    let finished = false;

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            let row: CheckResult = getRow(board, x, y, maxRequired);
            let column: CheckResult = getColumn(board, x, y, maxRequired);
            let diagonalA: CheckResult = getDiagonalA(board, x, y, maxRequired);
            let diagonalB: CheckResult = getDiagonalB(board, x, y, maxRequired);
            if (row.winner !== "") {
                finished = true;
                current = row.winner;
            }
            if (column.winner !== "") {
                finished = true;
                current = column.winner;
            }
            if (diagonalA.winner !== "") {
                finished = true;
                current = diagonalA.winner;
            }
            if (diagonalB.winner !== "") {
                finished = true;
                current = diagonalB.winner;
            }
        }
    }

    return {
        finished,
        winner: current,
    };

}

// top to bottom
export function getRow(board: GameBoard, x: number, y: number, max: number): CheckResult {
    let hits = 0;
    let prev = "";
    for (let a = 0; a < max; a++) {
        if (hits === max) continue;
        let value = getValue(board, x, y + a);
        if (value) {
            if (prev === value || prev === "") {
                hits++;
            } else {
                hits = 1;
            }
            prev = value;
        } else {
            hits = 0;
        }
    }
    if (hits === max) {
        return {
            winner: prev
        }
    }
    return {
        winner: "",
    }
}

// left to right
export function getColumn(board: GameBoard, x: number, y: number, max: number): CheckResult {
    let hits = 0;
    let prev = "";
    for (let a = 0; a < max; a++) {
        if (hits === max) continue;
        let value = getValue(board, x + a, y);
        if (value) {
            if (prev === value || prev === "") {
                hits++;
            } else {
                hits = 1;
            }
            prev = value;
        } else {
            hits = 0;
        }
    }
    if (hits === max) {
        return {
            winner: prev
        }
    }
    return {
        winner: "",
    }
}

// top left to bottom right
export function getDiagonalA(board: GameBoard, x: number, y: number, max: number): CheckResult {
    let hits = 0;
    let prev = "";
    for (let a = 0; a < max; a++) {
        if (hits === max) continue;
        let value = getValue(board, x + a, y + a);
        if (value) {
            if (prev === value || prev === "") {
                hits++;
            } else {
                hits = 1;
            }
            prev = value;
        } else {
            hits = 0;
        }
    }
    if (hits === max) {
        return {
            winner: prev
        }
    }
    return {
        winner: "",
    }
}

export function getDiagonalB(board: GameBoard, x: number, y: number, max: number): CheckResult {
    let hits = 0;
    let prev = "";
    for (let a = 0; a < max; a++) {
        if (hits === max) continue;
        let value = getValue(board, x - a, y + a);
        if (value) {
            if (prev === value || prev === "") {
                hits++;
            } else {
                hits = 1;
            }
            prev = value;
        } else {
            hits = 0;
        }
    }
    if (hits === max) {
        return {
            winner: prev
        }
    }
    return {
        winner: "",
    }
}

export function getValue(board: GameBoard, x: number, y: number): string {
    return board[y] && board[y][x] ? board[y][x] : '';
}
