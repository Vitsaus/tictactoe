import {GameEntity} from "../entities/GameEntity";
import {findGame} from "../services/game";
import {Request, Response} from "express";
import { MoveEntity } from "../entities/MoveEntity";
import { findMovesByGame } from "../services/move";

export async function getGameRoute(req: Request, res: Response) {

    try {

        const id: number = req.query.id;

        const game: GameEntity = await findGame(id);
        const moves: MoveEntity[] = await findMovesByGame(id);

        res.status(200).json({
            game,
            moves
        });

    } catch (e) {

        console.log('error', e);

        res.status(400).json({
            error: e
        });

    }

}
