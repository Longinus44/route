import path from "path";
require("dotenv").config({ path: "../.env" });
import * as dotenv from "dotenv";
dotenv.config();

export const dbconfig = {
  jwtkey: String(process.env.JWTKEY),
  client: String(process.env.client),
  user: String(process.env.user),
  password: String(process.env.sql_password),
  database: String(process.env.sql_database),
};
