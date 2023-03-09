import { body } from "express-validator";

export const todoValidator = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("title must be at least 6 characters long"),
  body("items")
    .isLength({ min: 3 })
    .withMessage("item must be at least 4 characters long"),
];
