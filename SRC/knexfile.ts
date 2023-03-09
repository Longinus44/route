// Update with your config settings.
import path from "path";
import { dbconfig } from "./sqltodoApp/sqlConfig/sqlConfig";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: dbconfig.client,
    connection: {
      user: dbconfig.user,
      password: dbconfig.password,
      database: dbconfig.database,
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
