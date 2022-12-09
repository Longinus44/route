require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { productmodel as Product } from "../serverModel/product2";
// const auth = require("../middleware/chech-Auth2");
import { check_auth } from "../middleware/check-auth";
import multer from "multer";
import { imageModel } from "../Model/imagemodel";
import path from "path";

const router = express.Router();
router.use("/upload", express.static("./upload/images"));

// router.use(errHandler);

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 50000,
  // },
});
// function errHandler(err: any, req: Request, res: Response) {
//   console.log(err);
//   res.send(err.message);
// }

router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    const newImage = new imageModel({
      name: req.body.name,
      image: {
        data: req.file?.filename,
        contentType: "image/jpeg",
      },
    });
    newImage
      .save()
      .then((result) => {
        const response = {
          status: true,
          message: "Image uploaded successfully",
          data: {
            // return {
            id: result.id,
            name: result.name,
            image: `http://localhost:6000/image/${req.file?.filename}`,
            // };
          },
        };
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
);

router.get("/", check_auth, (req: Request, res: Response) => {
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

router.post("/", (req: Request, res: Response) => {
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
