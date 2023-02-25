"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidator = void 0;
const express_validator_1 = require("express-validator");
exports.todoValidator = [
    (0, express_validator_1.body)("title")
        .isLength({ min: 5 })
        .withMessage("title must be at least 6 characters long"),
    (0, express_validator_1.body)("item")
        .isLength({ min: 3 })
        .withMessage("item must be at least 4 characters long"),
];
