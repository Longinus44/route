import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import mongoose from "mongoose";
import { ProductModel as Product } from "../Model/product";
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, process.cwd() + file);
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req: Request, res: Response) => {
  Product.find()
    .select("name price _id")
    .then((result: any) => {
      const response = {
        count: result.length,
        products: result.map((result: any) => {
          return {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:5446/product/" + result._id,
            },
          };
        }),
      };
      if (result.length > 0) {
        res.send(response);
        console.log(result);
      } else {
        res.send("No entry found");
      }
    })
    .catch((err: any) => {
      console.log(err.message);
    });
});

router.get("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No product found for provided Id");
      }
    })
    .catch((err: any) => {
      res.send("invalid Id");
    });
});

router.post(
  "/",
  upload.single("productImage"),
  (req: Request, res: Response) => {
    const product = new Product({
      _Id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });
    product
      .save()
      .then((result) => {
        res.send(result);
        console.log(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
    // res.send('prod post made')
  }
);

router.patch("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  const { name, price } = req.body;

  Product.findByIdAndUpdate(
    { _id: id },
    { $set: { name, price } },
    { new: true }
  )
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
});
router.delete("/:productId", (req: Request, res: Response) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.send("delete successful");
    })
    .catch((err: any) => {
      console.log(err);
    });
});
export default router;

// function productImage(product: any): any {
//     throw new Error("Function not implemented.");
// }
