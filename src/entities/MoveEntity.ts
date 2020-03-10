import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {GameEntity} from "./GameEntity";

@Entity({ name: 'moves' })
export class MoveEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    value: string;

    @ManyToOne(type => GameEntity, game => game.moves)
    @JoinColumn({ name: 'game_id' })
    game: GameEntity;

}
