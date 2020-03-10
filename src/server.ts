import express, {Express} from "express";
import {getGameRoute} from "./routes/getGameRoute";
import {updateGameRoute} from "./routes/updateGameRoute";
import {createGameRoute} from "./routes/createGameRoute";
import { listGamesRoute } from "./routes/listGamesRoute";

export function createServer(): Express {

    const app: Express = express();

    app.use(express.json({
        type: 'application/json',
    }));

    app.get('/api/game', getGameRoute);
    app.get('/api/games', listGamesRoute);

    app.post('/api/game', createGameRoute);

    app.put('/api/game', updateGameRoute);

    return app;

}
