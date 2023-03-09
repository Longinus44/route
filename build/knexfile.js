"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const path_1 = __importDefault(require("path"));
const sqlConfig_1 = require("./sqltodoApp/sqlConfig/sqlConfig");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
exports.default = {
    development: {
        client: sqlConfig_1.dbconfig.client,
        connection: {
            user: sqlConfig_1.dbconfig.user,
            password: sqlConfig_1.dbconfig.password,
            database: sqlConfig_1.dbconfig.database,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "migrations",
            directory: path_1.default.join(__dirname, "./sqltodoApp/migrations/"),
            extension: "ts",
        },
    },
};
