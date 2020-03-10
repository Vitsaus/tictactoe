import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {MoveEntity} from "./MoveEntity";

@Entity({ name: 'games' })
export class GameEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    finished: boolean;

    // starting player
    @Column()
    starter: string;

    // current player
    @Column()
    current: string;

    // winning player
    @Column()
    winner: string;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column({ name: 'hits_required' })
    hitsRequired: number;

    @OneToMany(type => MoveEntity, move => move, {
        cascade: true
    })
    moves: MoveEntity[];

}
