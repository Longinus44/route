import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./knexfile";
import knex from "knex";
import objection from "objection";
import todoRoute from "./sqltodoApp/sqlTodoRoutes/todoroutes";
import userRoute from "./sqltodoApp/sqlTodoRoutes/userRoutes";
import itemRoute from "./sqltodoApp/sqlTodoRoutes/itemRoutes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/todo", todoRoute);
app.use("/todo/item", itemRoute);

export const db = objection.Model.knex(knex(config.development));

app.listen(9000, () => {
  console.log(`application is live at http://localhost:9000`);
});
