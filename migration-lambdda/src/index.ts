import * as path from "path";
import {getDefaultConnection, teardownConnection} from "../../MyProject/src/data-source";
import "../../MyProject/src/entity";

enum CMD {
    runMigrations,
    undoLastMigration,
}

exports.handler = async (event) => {
    console.log("received event: ", JSON.stringify(event, null, 2));
    if (!(event.cmd in CMD)) {
        return Promise.reject(new Error(`unknown cmd: ${event.cmd}`));
    }

    const connection = await getDefaultConnection();

    try {
        switch (+CMD[event.cmd]) {
            case CMD.runMigrations:
                await connection.runMigrations();
                console.log("[db] migrations successfully finished");
                break;
            case CMD.undoLastMigration:
                await connection.undoLastMigration();
                console.log("[db] undo last odyssey-migration successfully finished");
                break;
        }
    } catch (err) {
        console.log("[db] failed to run migrations: ", err);
        throw err;
    }
    await teardownConnection();
    return "ok";
};
