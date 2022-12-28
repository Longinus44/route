"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupvalidator = void 0;
const express_validator_1 = require("express-validator");
function signupvalidator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: "validation", message: errors.array });
    }
    next();
}
exports.signupvalidator = signupvalidator;
