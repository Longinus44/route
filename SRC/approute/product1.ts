import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import express, { Request, Response, NextFunction } from "express";
import mongoose, { set } from "mongoose";
import { IProduct, Productmodel as Product } from "../appmodel/product1";
const router = express.Router();
uuidv4();

router.get("/:productId", (req: Request, res: Response) => {
  Product.findById(req.params.productId)
    .then((result) => {
      if (!result) {
        res.status(500).send("product Item not found");
      } else {
        res.send(result);
        console.log(result);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/", (req: Request, res: Response) => {
  Product.find()
    .select("name price _id")
    .then((result) => {
      const response = {
        count: result.length,
        product: result.map((product) => {
          return {
            name: product.name,
            price: product.price,
            _id: product._id,
            Request: {
              type: "get",
              url: `http://localhost/product/${product._id}`,
            },
          };
        }),
      };
      if (result.length <= 0) {
        res.send("no product found");
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req: Request, res: Response) => {
  const { name, price } = req.body;
  Product.find({ name }).then((result) => {
    if (result.length >= 1) {
      res.send("name already exist");
    } else {
      const product: IProduct = {
        _Id: new mongoose.Types.ObjectId(),
        name,
        price,
      };

      new Product(product)
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  });
});

router.patch("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  const { name, price } = req.body;

  Product.findByIdAndUpdate(
    { _Id: id },
    { $set: { name, price } },
    { new: true }
  ).then((result) => {
    res.send(result);
    console.log(`${name} updated successfully`);
  });

  res.send("prod updated");
});

router.delete("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  Product.findByIdAndRemove({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
        res.status(500).send("product already removed");
      } else {
        res.send("product deleted");
        console.log(`${result.id}deleted`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
