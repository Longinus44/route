"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("please use a valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage(" password must be must be at least 5 characters long"),
];
