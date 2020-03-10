import {GameEntity} from "../entities/GameEntity";
import { findGames } from "../services/game";
import {Request, Response} from "express";

export async function listGamesRoute(req: Request, res: Response) {

    try {

        const games: GameEntity[] = await findGames();

        res.status(200).json(games);

    } catch (e) {

        console.log('error', e);

        res.status(400).json({
            error: e
        });

    }

}
