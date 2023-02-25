// Update with your config settings.
import path from "path";
import { dbConfig } from "./sqltodoApp/sqlConfig/sqlConfig";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: dbConfig.client,
    connection: {
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: path.join(__dirname, "./sqltodoApp/migrations/"),
      extension: "ts",
    },
  },
};
