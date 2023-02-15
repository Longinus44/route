"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyvalidator = void 0;
const express_validator_1 = require("express-validator");
exports.bodyvalidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: Number(6), max: Number(20) })
        .withMessage("Password must be at least 6 characters long"),
    (0, express_validator_1.body)("phone")
        .isLength({ min: 10, max: 11 })
        .withMessage("enter a valid phone number"),
];
