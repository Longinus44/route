// import Express, { Request, Response, NextFunction } from "express";
require("dotenv").config();
import { config } from "./CONFIG/config";
import Express, { Request, Response, NextFunction } from "express";
import { dataBase } from "./Database/database";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import userroute from "./ROUTE/user";

const app = Express();
const port = config.port;

dataBase.connect(config.dataBase.Name, config.dataBase.Password);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan("dev"));
app.use("/user", userroute);

app.get("/", (req: Request, res: Response) => {
  res.send("ready");
});

app.listen(port, () => {
  console.log(`application is live on ${config.host}${config.port}`);
});
