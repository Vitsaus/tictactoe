import {GameEntity} from "../entities/GameEntity";
import {MoveEntity} from "../entities/MoveEntity";
import {checkForResult, createGame, mark} from "../utils";
import {findGame, saveGame} from "../services/game";
import {findMovesByGame, saveMove} from "../services/move";
import {Request, Response} from "express";
import { UpdateGameDto } from "../dtos/updateGameDto";
import { validate } from "class-validator";

export async function updateGameRoute(req: Request, res: Response) {

    try {

        const {
            id, x, y, value
        } = req.body;

        const updateGameDto = new UpdateGameDto();
        updateGameDto.mapRequest(req);

        const errors = await validate(updateGameDto);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const gameEntity: GameEntity = await findGame(id);

        if (!gameEntity) {
            return res.status(400).json({
                error: 'game not found!'
            });
        }

        if (gameEntity.finished) {
            return res.status(400).json({
                error: 'game is already finished'
            });
        }

        if (gameEntity.current !== value) {
            return res.status(400).json({
                error: 'can not make move twice'
            });
        }

        const moves: MoveEntity[] = await findMovesByGame(id);

        const game = createGame(gameEntity.width, gameEntity.height, moves);
        const marked = mark(game.board, x, y, value);

        if (marked) {

            const moveEntity = new MoveEntity();

            moveEntity.game = gameEntity;
            moveEntity.value = value;
            moveEntity.x = x;
            moveEntity.y = y;

            const move = await saveMove(moveEntity);
            const result = checkForResult(game.board, 3);

            gameEntity.current = value === 'o' ? 'x' : 'o';
            gameEntity.finished = result.finished;
            gameEntity.winner = result.winner;

            await saveGame(gameEntity);

            res.status(200).json(move);

        } else {
            return res.status(400).json({
                error: 'move failed'
            });
        }

    } catch(e) {

        console.log('error', e);

        res.status(400).json({
            error: e
        });

    }

}
