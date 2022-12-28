import { validationResult } from "express-validator";
import Express, { Request, Response, NextFunction } from "express";

export function signupvalidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: "validation", message: errors.array });
  }
  next();
}
