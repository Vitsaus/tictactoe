import {saveGame} from "../services/game";
import {Request, Response} from "express";
import { CreateGameDto } from "../dtos/createGameDto";
import { validate } from 'class-validator';

export async function createGameRoute(req: Request, res: Response) {

    try {

        const createGameDto = new CreateGameDto();

        createGameDto.mapRequest(req);

        const errors = await validate(createGameDto);

        if (errors.length > 0) {
            console.log('got errors on create game', errors);
            return res.status(400).json(errors);
        }

        const gameEntity = createGameDto.toGameEntity();
        const game = await saveGame(gameEntity);

        res.status(200).json(game);

    } catch(e) {

        console.log('error', e);

        res.status(400).json({
            error: e
        });

    }

}
