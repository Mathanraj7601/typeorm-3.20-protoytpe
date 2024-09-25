import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path";

export {DataSource};
let connection: DataSource;

export async function getDefaultConnection(): Promise<DataSource> {
    try {
        if (connection) {
            return connection;
        }
        const migrationsDir: string = path.join(
            __dirname,
            '../migration-lambda/src/migrations/*.{js,ts}'
        );
        connection = new DataSource({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            port: 3306,
            logging: true,
            synchronize: false,
            migrations: [migrationsDir],
            entities: [path.join(__dirname, '/entity/*.{js,ts}')]
        });
        console.log('[db] connection successfully established');
        return connection.initialize();
    } catch (err) {
        console.log('[db] failed to create connection: ', err);
        throw err;
    }
}

export async function getTestConnection(): Promise<DataSource> {
    const inLocalEnv = (process.env.NODE_ENV !== 'production');

    try {
        if (connection) {
            return connection;
        }
        const migrationsDir: string = path.join(
            __dirname,
            '../migration-lambda/src/migrations/*.{js,ts}'
        );
        connection =await new DataSource({
            type: 'mysql',
            name: 'test',
            host: "localhost",
            database: "test",
            username: "root",
            password: "password",
            port: 3306,
            logging: false,
            synchronize: true,
            dropSchema: inLocalEnv,
            entities: [path.join(__dirname, 'entity/*.{js,ts}')],
            migrationsRun: true,
            migrations: [migrationsDir]
        });

        console.log('[db] connection successfully established');
        return connection.initialize();
    } catch (err) {
        console.log('[db] failed to create connection: ', err);
        throw err;
    }   
}

export async function teardownTestConnection() {
    try {
        await connection.destroy();
        console.log('[db]  to close connection');
    } catch (err) {
        console.log('[db] failed to close connection: ', err);
    }
}


export async function teardownConnection() {
    try {
        await connection.destroy();
        console.log('[db]  to close connection');  
    } catch (err) {
        console.log('[db] failed to close connection: ', err);
    }
}
