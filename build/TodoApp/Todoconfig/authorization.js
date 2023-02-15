"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyAuth = void 0;
const express_validator_1 = require("express-validator");
const userRoutes_1 = __importDefault(require("../Todoroutes/userRoutes"));
exports.bodyAuth = [
    (0, express_validator_1.body)("username")
        .isLength({ min: 5, max: 15 })
        .withMessage("username must be at least 6 characters long"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 6 characters long"),
];
exports.default = userRoutes_1.default;
