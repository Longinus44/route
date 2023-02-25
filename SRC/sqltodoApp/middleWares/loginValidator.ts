import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().withMessage("please use a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage(" password must be must be at least 5 characters long"),
];
