import { check, validationResult } from "express-validator";
import { request } from "http";
import express, { Request, Response, NextFunction } from "express";

export function validatesignupSchema(
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
