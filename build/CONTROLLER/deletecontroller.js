"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletebyEmail = exports.deleteUserById = void 0;
const userModel_1 = require("../MODEL/userModel");
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const delUser = userModel_1.userModel.findByIdAndDelete(id);
        const result = await delUser;
        if (result) {
            return res.send("user deleted");
        }
        return res.status(404).send("user not found");
    }
    catch (Error) {
        res.status(500).send(Error);
    }
};
exports.deleteUserById = deleteUserById;
const deletebyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const delUser = userModel_1.userModel.findOneAndRemove({ email });
        const result = await delUser;
        if (result) {
            return res.send("user deleted");
        }
        return res.status(404).send("user with email not found");
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.deletebyEmail = deletebyEmail;
exports.default = {
    deletebyEmail: exports.deletebyEmail,
    deleteUserById: exports.deleteUserById,
};
