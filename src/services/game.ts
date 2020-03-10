import {GameEntity} from "../entities/GameEntity";
import {Connection, getConnection} from "typeorm";

export async function findGame(id: number): Promise<GameEntity> {

    const connection: Connection = getConnection();
    const gameRepository = connection.getRepository(GameEntity);

    return gameRepository.createQueryBuilder("g")
        .where("g.id = :id", { id })
        .getOne();

}

export async function findGames(): Promise<GameEntity[]> {

    const connection: Connection = getConnection();
    const gameRepository = connection.getRepository(GameEntity);

    return gameRepository.createQueryBuilder("g").getMany();

}

export async function saveGame(gameEntity: GameEntity): Promise<GameEntity> {

    const connection: Connection = getConnection();
    const gameRepository = connection.getRepository(GameEntity);

    return gameRepository.save(gameEntity);

}
