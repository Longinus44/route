import { body } from "express-validator";

export const bodyAuth = [
  body("username")
    .isLength({ min: 5, max: 15 })
    .withMessage("username must be at least 6 characters long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
];
