import { Tconfig } from "../Todoconfig/TodoConfig";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
