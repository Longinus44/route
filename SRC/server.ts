require("dotenv").config();
import { sConfig } from "./serverConfig/config";
import { sdatabase } from "./sdatabase";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = sConfig.port;
sdatabase.connect(sConfig.DB.name, sConfig.DB.password);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("get made ready");
});

app.listen(port, () => {
  console.log(`app is running on ${sConfig.host}:${sConfig.port}`);
});
