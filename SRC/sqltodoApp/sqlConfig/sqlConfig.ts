import path from "path";
require("dotenv").config("../.env");

export const dbConfig = {
  jwtkey: String(process.env.JWTKEY),
  client: String(process.env.client),
  user: String(process.env.user),
  password: String(process.env.sql_password),
  database: String(process.env.sql_database),
};
