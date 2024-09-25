"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardownConnection = exports.teardownTestConnection = exports.getTestConnection = exports.getDefaultConnection = exports.DataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
Object.defineProperty(exports, "DataSource", { enumerable: true, get: function () { return typeorm_1.DataSource; } });
const path = require("path");
let connection;
function getDefaultConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("00000000000000000", connection);
        try {
            if (connection) {
                return connection;
            }
            const migrationsDir = path.join(__dirname, '../migration-lambda/src/migrations/*.{js,ts}');
            connection = new typeorm_1.DataSource({
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
        }
        catch (err) {
            console.log('[db] failed to create connection: ', err);
            throw err;
        }
    });
}
exports.getDefaultConnection = getDefaultConnection;
function getTestConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const inLocalEnv = (process.env.NODE_ENV !== 'production');
        try {
            if (connection) {
                return connection;
            }
            const migrationsDir = path.join(__dirname, '../migration-lambda/src/migrations/*.{js,ts}');
            connection = yield new typeorm_1.DataSource({
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
        }
        catch (err) {
            console.log('[db] failed to create connection: ', err);
            throw err;
        }
    });
}
exports.getTestConnection = getTestConnection;
function teardownTestConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.destroy();
            console.log('[db]  to close connection');
        }
        catch (err) {
            console.log('[db] failed to close connection: ', err);
        }
    });
}
exports.teardownTestConnection = teardownTestConnection;
function teardownConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.destroy();
            console.log('[db]  to close connection');
        }
        catch (err) {
            console.log('[db] failed to close connection: ', err);
        }
    });
}
exports.teardownConnection = teardownConnection;
//# sourceMappingURL=data-source.js.map