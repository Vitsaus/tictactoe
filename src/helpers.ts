import {createConnection} from "typeorm";
import {createServer} from "./server";
import {Express} from "express";

export async function createAppServer() {

    try {

        await createConnection();

        const app: Express = createServer();

        return new Promise((resolve) => {

             const server = app.listen(3000, () => {
                console.log('server is running!');
                resolve(server);
            });

        });

    } catch(e) {

        console.log('server creation failed', e);

    }

}


