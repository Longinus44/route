"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const express_validator_1 = require("express-validator");
exports.bodyValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("please use a valid email"),
    (0, express_validator_1.body)("name")
        .isLength({ min: 5 })
        .withMessage("name must be at least 6 characters long"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 6 characters long"),
];
