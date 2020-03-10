import {checkForResult, createGame, mark} from "../utils";

describe('should work', function () {

    it('diagonal hit 1', () => {
        const game = createGame(6, 6, []);
        expect(mark(game.board, 0, 2, 'x')).toBe(true);
        expect(mark(game.board, 1, 1, 'x')).toBe(true);
        expect(mark(game.board, 2, 0, 'x')).toBe(true);
        const result = checkForResult(game.board, 3);
        expect(result.finished).toBe(true);
        expect(result.winner).toBe('x');
    });

    it('diagonal hit 2', () => {
        const game = createGame(6, 6, []);
        expect(mark(game.board, 2, 0, 'x')).toBe(true);
        expect(mark(game.board, 1, 1, 'x')).toBe(true);
        expect(mark(game.board, 0, 2, 'x')).toBe(true);
        const result = checkForResult(game.board, 3);
        expect(result.finished).toBe(true);
        expect(result.winner).toBe('x');
    });

    it('vertical hit', () => {
        const game = createGame(6, 6, []);
        expect(mark(game.board, 1, 2, 'x')).toBe(true);
        expect(mark(game.board, 1, 1, 'x')).toBe(true);
        expect(mark(game.board, 1, 0, 'x')).toBe(true);
        const result = checkForResult(game.board, 3);
        expect(result.finished).toBe(true);
        expect(result.winner).toBe('x');
    });

    it('horizontal hit', () => {
        const game = createGame(6, 6, []);
        expect(mark(game.board, 0, 2, 'x')).toBe(true);
        expect(mark(game.board, 1, 2, 'x')).toBe(true);
        expect(mark(game.board, 2, 2, 'x')).toBe(true);
        const result = checkForResult(game.board, 3);
        expect(result.finished).toBe(true);
        expect(result.winner).toBe('x');
    });

    it('should not be a hit', () => {
        const game = createGame(6, 6, []);
        expect(mark(game.board, 0, 2, 'x')).toBe(true);
        expect(mark(game.board, 1, 2, 'o')).toBe(true);
        expect(mark(game.board, 2, 2, 'x')).toBe(true);
        const result = checkForResult(game.board, 3);
        expect(result.finished).toBe(false);
        expect(result.winner).toBe('');
    });

});
