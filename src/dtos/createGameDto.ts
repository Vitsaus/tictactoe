import { MaxLength, MinLength, IsNumber } from "class-validator";
import { Request } from "express";
import { GameEntity } from "../entities/GameEntity";

export class CreateGameDto {

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;

    @IsNumber()
    hitsRequired: number;

    @MinLength(1, {
        message: "starter is required"
    })
    @MaxLength(1, {
        message: "starter is required"
    })
    starter: string;

    // In real life these should be in own mapper specific classes/functions
    mapRequest(req: Request) {
        this.width = req.body.width;
        this.height = req.body.height;
        this.hitsRequired = req.body.hitsRequired;
        this.starter = req.body.starter;
    }

    toGameEntity(): GameEntity {
        const gameEntity = new GameEntity();
        gameEntity.starter = this.starter;
        gameEntity.current = this.starter;
        gameEntity.finished = false;
        gameEntity.winner = '';
        gameEntity.width = this.width;
        gameEntity.height = this.height;
        gameEntity.hitsRequired = this.hitsRequired;
        gameEntity.moves = [];
        return gameEntity;
    }

}
