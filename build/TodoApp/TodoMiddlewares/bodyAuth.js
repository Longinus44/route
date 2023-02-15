"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyAuth = void 0;
const express_validator_1 = require("express-validator");
exports.bodyAuth = [
    (0, express_validator_1.body)("username")
        .isLength({ min: 5, max: 15 })
        .withMessage("username must be at least 6 characters long"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 6 characters long"),
];
