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
const data_source_1 = require("../../MyProject/src/data-source");
require("../../MyProject/src/entity");
var CMD;
(function (CMD) {
    CMD[CMD["runMigrations"] = 0] = "runMigrations";
    CMD[CMD["undoLastMigration"] = 1] = "undoLastMigration";
})(CMD || (CMD = {}));
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("received event: ", JSON.stringify(event, null, 2));
    if (!(event.cmd in CMD)) {
        return Promise.reject(new Error(`unknown cmd: ${event.cmd}`));
    }
    const connection = yield (0, data_source_1.getDefaultConnection)();
    try {
        switch (+CMD[event.cmd]) {
            case CMD.runMigrations:
                yield connection.runMigrations();
                console.log("[db] migrations successfully finished");
                break;
            case CMD.undoLastMigration:
                yield connection.undoLastMigration();
                console.log("[db] undo last odyssey-migration successfully finished");
                break;
        }
    }
    catch (err) {
        console.log("[db] failed to run migrations: ", err);
        throw err;
    }
    yield (0, data_source_1.teardownConnection)();
    return "ok";
});
//# sourceMappingURL=index.js.map