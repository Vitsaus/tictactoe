import {createAppServer} from "../helpers";
import request from "supertest";
import {getConnection} from "typeorm";

jest.setTimeout(30000);

describe("GET / - a simple api endpoint",  () => {

    let server = null;
    let gameId: number;

    beforeAll(async () => {
        server = await createAppServer();
    });

    it("Should create game", async (done) => {

        const r = await request(server)
                    .post("/api/game")
                    .send({
                        width: 3,
                        height: 3,
                        starter: "o",
                        hitsRequired: 3,
                    })
                    .expect(200);

        gameId = r.body.id;

        console.log('got game id', gameId);

        done();

    });

    it("Should not allow wrong player to make a move", async (done) => {

        await request(server)
                .put("/api/game")
                .send({
                    id: gameId,
                    x: 1,
                    y: 1,
                    value: "x"
                })
                .expect(400);

        done();

    });

    it("Should allow correct player to make a move", async (done) => {

        await request(server)
                .put("/api/game")
                .send({
                    id: gameId,
                    x: 0,
                    y: 0,
                    value: "o"
                })
                .expect(200);

        done();

    });

    it("Should finish the game", async (done) => {

        await request(server)
            .put("/api/game")
            .send({
                id: gameId,
                x: 2,
                y: 1,
                value: "x"
            }).expect(200);
        await request(server)
            .put("/api/game")
            .send({
                id: gameId,
                x: 1,
                y: 1,
                value: "o"
            }).expect(200);
        await request(server)
            .put("/api/game")
            .send({
                id: gameId,
                x: 0,
                y: 1,
                value: "x"
            }).expect(200);
        await request(server)
            .put("/api/game")
            .send({
                id: gameId,
                x: 2,
                y: 2,
                value: "o"
            }).expect(200);
        done();

    });

    it("Should find game", async (done) => {

        const result = await request(server)
                            .get(`/api/game?id=${gameId}`)
                            .expect(200);

        expect(result.body.game.id).toEqual(gameId);
        expect(result.body.game.finished).toEqual(true);

        done();

    });

  afterAll(() => {
      const connection = getConnection();
      connection.close();
      server.close();
  });

});
