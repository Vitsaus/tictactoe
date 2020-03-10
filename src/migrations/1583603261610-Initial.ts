import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1583603261610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE games(
               id serial PRIMARY KEY,
               finished BOOLEAN NOT NULL default false,
			   current CHAR(1) NOT NULL default '',
			   starter CHAR(1) NOT NULL default '',
               winner CHAR(1) NOT NULL default '',
               width int NOT NULL,
               height int NOT NULL,
			   hits_required int NOT NULL default 3
            );
        `);
        await queryRunner.query(`
            CREATE TABLE moves(
               id serial PRIMARY KEY,
               game_id INTEGER REFERENCES games(id),
               x int NOT NULL,
               y int NOT NULL,
			   value CHAR(1) NOT NULL default ''
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE moves`);
        await queryRunner.query(`DROP TABLE games`);
    }

}
