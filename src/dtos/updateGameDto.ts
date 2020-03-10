import { IsNumber, MaxLength, MinLength } from "class-validator";
import { Request } from "express";

export class UpdateGameDto {

    @IsNumber()
    id: number;

    @IsNumber()
    x: number;

    @IsNumber()
    y: number;

    @MinLength(1, {
        message: "starter is required"
    })
    @MaxLength(1, {
        message: "starter is required"
    })
    value: number;

    mapRequest(req: Request) {
        this.id = req.body.id;
        this.x = req.body.x;
        this.y = req.body.y;
        this.value = req.body.value;
    }

}
