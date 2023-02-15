import { config } from "../CONFIG/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const check_auth = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = config.secretkey;

  const hash = jwt.sign(req.body.password, secretKey);
  //   console.log(hash);

  let decode = jwt.verify(hash, secretKey);
  console.log(decode);
  next();
};
