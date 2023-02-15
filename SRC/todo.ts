require("dotenv").config();
import { Tconfig } from "./TodoApp/Todoconfig/TodoConfig";
import Express, { Request, Response, NextFunction } from "express";
import { Database } from "./TodoApp/TodoDatabase/TodoDatabase";
import cors from "cors";
import UserRoutes from "./TodoApp/Todoroutes/userRoutes";
import Todoroutes from "./TodoApp/Todoroutes/Todoroutes";

const app = Express();
const port = Tconfig.Port;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
app.use("/user", UserRoutes);
app.use("/user/todo", Todoroutes);

Database.connect(Tconfig.Database.DB_Name, Tconfig.Database.DB_Code);

app.get("/", (req: Request, res: Response) => {
  res.send("app is ready");
});

app.listen(port, () => {
  console.log(`Application is live on ${Tconfig.Host}${Tconfig.Port}`);
});
