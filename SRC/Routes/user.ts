import { hash } from "bcrypt";
import express, { Express, Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");
//   let home =  fs.readFile("./files/land.html");

const router = express.Router();
const User = require("../Model/user");

// let home = document.getElementById;

router.get("/", (req: Request, res: Response) => {
  User.find()
    .select("email password id")
    .then((user: any) => {
      if (user.length <= 0) {
        res.send("user empty");
      } else {
        res.send({
          count: user.length,
          user,
        });
      }
    });
});

router.post("/signup", (req: Request, res: Response) => {
  User.find({ email: req.body.email })
    // .exec()
    .then((user: any) => {
      if (user.length >= 1) {
        res.send("email already exists");
      } else {
        bcrypt.hash(req.body.password, 10, (err: any, hash: any) => {
          if (err) {
            res.send(err.message);
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result: any) => {
                res.send("user created successfully");
                console.log(result);
              })
              .catch((err: any) => {
                console.log(err.message);
              });
          }
        });
      }
    });
});

router.post("/login", (req: Request, res: Response) => {
  const code = "secretAccessKey";
  User.find({ email: req.body.email })
    .then((user: any) => {
      if (user.length < 1) {
        res.send("Auth failed");
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          (err: any, result: any) => {
            if (err) {
              res.send("auth failed");
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0],
                  userId: user[0]._id,
                },
                /*process.env.JWTKEY*/ code,
                {
                  expiresIn: "1h",
                }
              );
              res.send({
                message: "Auth successful",
                token: token,
              });
            } else {
              res.status(200).json({
                message: "Auth failed",
              });
            }
          }
        );
      }
    })
    .catch((err: any) => {
      res.send(err.message);
    });
});

router.delete("/:userId", (req: Request, res: Response) => {
  User.deleteOne({ id: req.params.userId })
    .exec()
    .then((result: any) => {
      res.send("user deleted successfully");
    })
    .catch((err: any) => {
      console.log(err.message);
    });
});

export default router;
