import { Request, Response, NextFunction } from "express";
import { STATUS } from "../sqlModel/Types/ITodoItemModel";

export const statusCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.status) {
    return res.send(`input status, COMPLETED or PENDING `);
  } else {
    next();
  }
};
