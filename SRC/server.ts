require("dotenv").config();
import { sConfig } from "./serverConfig/config";
import { sdatabase } from "./sdatabase";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import productroute from "./serverroute/product2";
import orderroute from "./serverroute/order2";
import userroute from "./serverroute/user2";
import { appConfig } from "./Config/appConfig";

const app = express();
const port = sConfig.port;
sdatabase.connect(sConfig.DB.name, sConfig.DB.password);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/product", productroute);
app.use("/order", orderroute);
app.use("/user", userroute);

app.get("/", (req: Request, res: Response) => {
  res.send("get made ready");
});

app.listen(port, () => {
  console.log(`app is running on ${sConfig.host}:${sConfig.port}`);
});
