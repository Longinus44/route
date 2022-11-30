import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import cors from "cors";
import productroute from "./Routes/product";
import orderroute from "./Routes/order";
import bodyParser from "body-parser";
import userroute from "./Routes/user";
import { indexconfig } from "./Config/indexconfig";
import { Database } from "./DataB";

Database.connect(indexconfig.database2.name, indexconfig.database2.password);

const app = express();
const port = 5446;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/product", productroute);
app.use("/order", orderroute);
app.use("/user", userroute);

app.get("/", (req: Request, res: Response) => {
  res.send("get madey");
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
