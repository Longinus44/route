require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { productmodel as Product } from "../serverModel/product2";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Product.find().then((result) => {
    res.send(result);
  });
});

router.get("/:productId", (req: Request, res: Response) => {
  res.send("id");
});

router.post("/", (req: Request, res: Response) => {
  const product = new Product({
    _Id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/", (req: Request, res: Response) => {
  res.send("product updated");
});

router.delete("/", (req: Request, res: Response) => {
  res.send("product deleted");
});
