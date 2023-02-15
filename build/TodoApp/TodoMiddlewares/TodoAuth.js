"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            throw new Error();
        }
        next();
    }
    catch (err) {
        res.status(401).send("Please authenticate");
    }
};
exports.auth = auth;
