"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodySchema = void 0;
const express_validator_1 = require("express-validator");
exports.bodySchema = [
    (0, express_validator_1.body)("email").isEmail(),
    // .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 6 characters long"),
    (0, express_validator_1.body)("phone_Number")
        .isLength({ min: 10, max: 11 })
        .withMessage("Phone number must be"),
];
