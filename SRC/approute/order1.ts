import express, { Router, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ordermodel as Order } from "../appmodel/order1";
import { Productmodel as Product } from "../appmodel/product1";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Order.find()
    .then((result) => {
      const response = {
        count: result.length,
        Orders: result.map((result) => {
          return {
            _Id: result.id,
            product: result.productId,
            quantity: result.quantity,
          };
        }),
      };
      res.send(response);
    })
    .catch((err) => {
      res.send("order error");
    });
});

router.get("/:orderId", (req: Request, res: Response) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", (req: Request, res: Response) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity,
  });
  order
    .save()
    .then((result) => {
      res.send(result);
      console.log("order made");
    })
    .catch((err) => {
      res.send("order post made");
    });
});

router.delete("/", (req: Request, res: Response) => {
  res.send("order deleted");
});

export default router;
