import { body } from "express-validator";

export const bodyValidator = [
  body("email").isEmail().withMessage("please use a valid email"),
  body("name")
    .isLength({ min: 5 })
    .withMessage("name must be at least 6 characters long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
];
