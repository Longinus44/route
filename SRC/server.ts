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
// import userroute from "./serverroute/user2";
import userroute from "./serverroute/user3";
import multer from "multer";
import path from "path";

const app = express();
const port = sConfig.port;
sdatabase.connect(sConfig.DB.name, sConfig.DB.password);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/product", productroute);
app.use("/order", orderroute);
// app.use("/user", userroute);
app.use("/user", userroute);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
app.use("/upload", express.static("upload/images"));

app.get("/", (req: Request, res: Response) => {
  res.send("get made ready");
});

app.post("/upload", upload.single("profile"), (req: Request, res: Response) => {
  res.send({
    success: true,
    image: `http://localhost:6000/profile/${req.file?.filename}`,
    message: "profile uploaded",
  });
  console.log(req.file);
});
function errHandler(err: any, req: Request, res: Response) {
  if (err instanceof multer.MulterError) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}
app.use(errHandler);
app.listen(port, () => {
  console.log(`app is running on ${sConfig.host}:${sConfig.port}`);
});
