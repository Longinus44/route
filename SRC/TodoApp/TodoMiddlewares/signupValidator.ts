import { check, validationResult } from "express-validator";
import express, { Request, Response, NextFunction } from "express";
// import router from "express";

export function validatesignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "validation",
      errors: errors.array(),
    });
  }
  next();
}
