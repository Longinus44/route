"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = void 0;
const userModel_1 = require("../MODEL/userModel");
const getAllUser = async (req, res) => {
    try {
        const user = userModel_1.userModel.find().select("firstname lastname othername email password date_of_birth state_of_origin");
        const result = await user;
        if (result) {
            return res.send(result);
        }
        return res.status(404).send("No user found");
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.getAllUser = getAllUser;
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = userModel_1.userModel.findById(id);
        const result = await user;
        if (result) {
            return res.send(result);
        }
        return res.status(404).send(" Not Found");
    }
    catch (err) {
        res.status(500).send(err);
    }
};
const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = userModel_1.userModel.find({ email: email });
        const result = await user;
        if (result) {
            return res.send(result);
        }
        return res.status(404).send(" Not Found");
    }
    catch (err) {
        res.status(500).send(err);
    }
};
// export default router
exports.default = {
    getAllUser: exports.getAllUser,
    getUserById,
    getUserByEmail,
};
// .then((user) => {
// if (user) {
//   res.status(200).send({
//     count: user.length,
//     user: user,
//   });
// }
// else
//    {
//     res.status(404).send("Not Found");
//   }
// }
