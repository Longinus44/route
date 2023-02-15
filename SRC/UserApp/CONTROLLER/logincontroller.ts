import { config } from "../CONFIG/config";
import Express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../MODEL/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import router from "./registercontroller";

export const loginUser = (req: Request, res: Response) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user[0].password, (err, data) => {
        if (err) {
          console.log("Authentication failed");
        }
        if (data) {
          const token = jwt.sign(
            {
              email: user[0].email,
              // userid: user[0]._id,
            },
            config.secretkey,
            { expiresIn: "1hr" }
          );
          res.send(token);
        } else {
          res.status(401).send("Auth failed");
        }
      });
    }
  });
};

export default {
  router,
  loginUser,
};
