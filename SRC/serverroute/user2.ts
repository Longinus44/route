import { sConfig } from "../serverConfig/config";
import { validatesignupSchema } from "../middleware/signup validator";
import express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../serverModel/user2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { check, validationResult } from "express-validator";
import { bodySchema } from "../middleware/sign-up";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  User.find().then((result) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("No users found");
    }
  });
});

router.post(
  "/signup",
  bodySchema,
  validatesignupSchema,
  (req: Request, res: Response) => {
    User.find({ email: req.body.email })
      .then((result) => {
        if (result.length > 0) {
          res.send("email is already registered");
        } else {
          bcrypt.hash(req.body.password, 5, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              const user = new User({
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  res.send("sign-up successful");
                  console.log(result);
                })
                .catch((err) => {
                  res.send(err.message);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);

router.post("/login", (req: Request, res: Response) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length <= 0) {
        res.send("Auth failed due to email address");
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0],
                userId: user[0]._id,
              },
              sConfig.JWTKEY,
              { expiresIn: "1hr" }
            );
            res.send("successful Auth" + token);
          } else {
            res.send("Auth failed");
          }
        });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.delete("/:userId", (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      res.send("delete user");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

export default router;
