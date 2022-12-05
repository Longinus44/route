require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import { DataBase } from "./database";
import { appConfig } from "./Config/appConfig";
import productroute from "../SRC/approute/product1";
import orderroute from "../SRC/approute/order1";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

DataBase.connect(appConfig.database.name, appConfig.database.password);
console.log(appConfig.database.name + ":" + appConfig.database.password);
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/product", productroute);
app.use("/order", orderroute);

app.get("/", (req: Request, res: Response) => {
  res.send("get made");
});

app.listen(appConfig.port, () => {
  console.info(`Application running on ${appConfig.host}:${appConfig.port}`);
});
