require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { productmodel as Product } from "../serverModel/product2";
// import checkAuth from '../middleware/chech-Auth2'
const checkAuth = require("../middleware/chech-Auth2");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Product.find()
    .then((result) => {
      if (result.length <= 0) {
        res.status(500).send("no product found");
      } else {
        const response = {
          count: result.length,
          product: result.map((result) => {
            return {
              Id: result.id,
              name: result.name,
              price: result.price,
              request: {
                type: "get",
                url: "http://localhost/product" + result.id,
              },
            };
          }),
        };
        res.send(response);
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((result) => {
      if (!result) {
        res.status(500).send("product not found");
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.post("/", checkAuth, (req: Request, res: Response) => {
  const name = req.body.name;
  Product.findOne({ name })
    .then((result) => {
      if (result) {
        res.status(409).send("product exists");
      } else {
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
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.patch("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  const { name, price } = req.body;
  Product.findByIdAndUpdate(
    { _id: id },
    { $set: { name, price } },
    { new: true }
  )
    .then((result) => {
      res.send("product updated");
      console.log(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.delete("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  Product.findByIdAndRemove(id)
    .exec()
    .then((result) => {
      res.send("product deleted");
    })
    .catch((err) => {
      res.send(err.message);
    });
});
export default router;
