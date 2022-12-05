import express, {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import mongoose from "mongoose";
import { time, timeStamp } from "node:console";
import { request } from "node:http";
import { type } from "node:os";

const router = express.Router();
const Order = require("../Model/order");
const Product = require("../Model/product");

router.get("/", (req: Request, res: Response) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .then((result: any) => {
      const response = {
        count: result.length,
        products: result.map((result: any) => {
          return {
            _id: result._id,
            product: result.product,
            quantity: result.quantity,
            request: {
              type: "get",
              url: "http://localhost:5446/order/" + result._id,
            },
          };
        }),
      };
      res.send(response);
    })
    .catch((err: any) => {
      res.send("error message");
    });
});

router.get("/:orderId", (req, res, next) => {
  const msg = "order not found";

  Order.findById(req.params.orderId)
    .populate("product", "name")
    .exec()
    .then((order: any) => {
      if (!order) {
        res.send(msg);
      } else {
        res.send({
          message: order,
          request: {
            type: "get",
            url: "http://localhost:5446/order",
          },
        });
      }
    })

    .catch((err: any) => {
      res.send(err.message);
    });
});

router.post("/", (req: Request, res: Response) => {
  Product.findById(req.body.productId)
    .then((product: any) => {
      if (!product) {
        res.send("productid not found");
      } else {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId,
        });
        return order.save().then((result: any) => {
          res.send({
            message: "order made",
            createdOrder: {
              _id: result._id,
              product: result.product,
              quantity: result.quantity,
              createdat: Date.now(),
            },
            Request: {
              type: "get",
              url: "http://localhost:5446/order/" + result._id,
            },
          });
          console.log(result);
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send(err.message);
    });
});

router.delete("/:orderId", (req: Request, res: Response) => {
  const id = req.params.orderId;
  Order.deleteOne({ _Id: id })
    .exec()
    .then((result: any) => {
      console.log({ result, id });
      res.send({
        message: "order deleted",
        request: {
          type: "post",
          url: "http://localhost:5446/order",
          body: { productId: "ID", quantity: "NUMBER" },
        },
      });
    })
    .catch((err: any) => {
      res.send(err.message);
    });
});
export default router;
