require("dotenv").config();
import { sConfig } from "../serverConfig/config";
import Express, { Request, Response, NextFunction } from "express";
import user2 from "../serverroute/user2";
import { token } from "morgan";
import jwt from "jsonwebtoken";

module.exports = (req: Request, res: Response, Next: any) => {
  const ver = req.body.token;
  // console.log(req);
  console.log(token);
  try {
    const decode = jwt.verify(ver, sConfig.JWTKEY);
    let req = decode;

    Next();
  } catch (err) {
    console.log(err);
  }
};
