"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCheck = void 0;
const statusCheck = (req, res, next) => {
    let stat = req.body.status;
    if (!stat) {
        return res.send(`status input must be of COMPLETED | PENDING `);
    }
    else {
        next();
    }
};
exports.statusCheck = statusCheck;
