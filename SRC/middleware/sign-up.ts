import { body } from "express-validator";
import router from "SRC/approute/product1";

export const bodySchema = [
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
];
