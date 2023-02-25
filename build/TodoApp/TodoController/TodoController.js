"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const TodoModel_1 = require("../TodoModel/TodoModel");
const userModel_1 = require("../TodoModel/userModel");
class TodoController {
}
exports.TodoController = TodoController;
_a = TodoController;
TodoController.getAllTodo = async (req, res) => {
    try {
        const AllTodo = await TodoModel_1.TodoSchema.find().populate("user", "username");
        if (!AllTodo) {
            return res.status(404).send("list is empty");
        }
        return res.send(AllTodo);
    }
    catch (err) {
        console.log(err);
    }
};
TodoController.getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todoitem = await TodoModel_1.TodoSchema.findById(id);
        if (!todoitem) {
            return res.status(404).send("no todo found");
        }
        const user = await userModel_1.userModel.findOne(todoitem.user).select("id username ");
        return res.send({ user: user, Todo: todoitem });
    }
    catch (err) {
        console.log(err);
    }
};
TodoController.createTodo = async (req, res) => {
    const { Title, list, user } = req.body;
    try {
        const userExist = await userModel_1.userModel.findById(user);
        if (!userExist) {
            return res.status(400).send("unauthorized user");
        }
        const todoItem = new TodoModel_1.TodoSchema({
            Title,
            list,
            user,
        });
        if (!todoItem) {
            return res.status(401).send("fill the required ");
        }
        await todoItem.save();
        return res.send(todoItem);
    }
    catch (err) {
        res.send("user with id not found");
    }
};
TodoController.updateTodo = async (req, res) => {
    const { Title, list } = req.body;
    const id = req.params.id;
    try {
        const editTodo = await TodoModel_1.TodoSchema.findByIdAndUpdate({ _id: id }, { $set: { Title, list } }, { new: true });
        return res.send(editTodo);
    }
    catch (err) {
        console.log(err);
    }
};
TodoController.deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const todotodelete = await TodoModel_1.TodoSchema.findByIdAndDelete(id);
        if (todotodelete) {
            return res.send("item deleted successfully");
        }
        return res.status(404).send("item not found");
    }
    catch (err) {
        console.log(err);
    }
};
