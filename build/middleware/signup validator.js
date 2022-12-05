"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatesignupSchema = void 0;
const express_validator_1 = require("express-validator");
function validatesignupSchema(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "validation",
            errors: errors.array(),
        });
    }
    next();
}
exports.validatesignupSchema = validatesignupSchema;
