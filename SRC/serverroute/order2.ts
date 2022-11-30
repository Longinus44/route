require("dotenv").config();
import express, { Request, Response, NextFunction, Router } from "express";
import mongoose from "mongoose";
import { productmodel as Product } from "../serverModel/product2";
import { ordermodel as Order } from "../serverModel/order2";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Order.find()
    .then((result) => {
      if (result.length <= 0) {
        res.send("No results found");
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:orderId", (req: Request, res: Response) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send("request not found");
      }
    })
    .catch((err) => {
      res.send("order get made");
    });
});

router.post("/", (req: Request, res: Response) => {
  const Id = req.body.productId;
  Product.findById(Id)
    .then((result) => {
      console.log(result);
      if (result) {
        const order = new Order({
          orderId: new mongoose.Types.ObjectId(),
          productId: req.body.productId,
          quantity: req.body.quantity,
        });
        order
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send("product doesn't exists");
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.delete("/:orderId", (req: Request, res: Response) => {
  const id = req.params.orderId;
  Order.findByIdAndRemove({ _id: id })
    .then((result) => {
      if (result) {
        res.send(result + "deleted");
      } else {
        res.send("request not found");
      }
    })
    .catch((err) => {
      res.send("order get made");
    });
});

export default router;
