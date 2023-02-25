import { NextFunction, Request, Response } from "express";

export const authorisedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
