import { body } from "express-validator";

export const bodyvalidator = [
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: Number(6), max: Number(20) })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .isLength({ min: 10, max: 11 })
    .withMessage("enter a valid phone number"),
];
