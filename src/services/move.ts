import {MoveEntity} from "../entities/MoveEntity";
import {Connection, getConnection} from "typeorm";

export async function findMovesByGame(id: number): Promise<MoveEntity[]> {

    const connection: Connection = getConnection();
    const moveRepository = connection.getRepository(MoveEntity);

    return moveRepository.createQueryBuilder("m")
        .innerJoin("m.game", "g")
        .where("g.id = :id", {
            id
        })
        .orderBy('m.id', 'DESC')
        .getMany();

}

export async function saveMove(moveEntity: MoveEntity): Promise<MoveEntity> {

    const connection: Connection = getConnection();
    const moveRepository = connection.getRepository(MoveEntity);

    return moveRepository.save(moveEntity);

}
