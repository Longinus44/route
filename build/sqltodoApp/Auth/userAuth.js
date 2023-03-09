"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorisedUser = void 0;
const authorisedUser = (req, res, next) => {
    try {
        const token = req.header("Auth-token");
        if (!token) {
            throw new Error();
        }
        next();
    }
    catch (err) {
        res.status(401).send("Please authenticate");
    }
};
exports.authorisedUser = authorisedUser;
