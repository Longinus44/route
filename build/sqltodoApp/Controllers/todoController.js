"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const todoModel_1 = require("../sqlModel/todoModel");
const UserModel_1 = require("../sqlModel/UserModel");
class todoController {
}
exports.todoController = todoController;
_a = todoController;
todoController.getAllTodo = async (req, res) => {
    try {
        const todo = await todoModel_1.TodoModel.query()
            .select("id", "title", "item", "user_id")
            .withGraphFetched("user");
        if (todo.length > 0) {
            return res.send(todo);
        }
        else {
            return res.status(404).send("no users to display");
        }
    }
    catch (err) {
        console.log(err);
    }
};
todoController.getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todoById = await todoModel_1.TodoModel.query().findOne({ id: id });
        if (todoById) {
            const user = await UserModel_1.UserModel.query()
                .findById(todoById.user_id)
                .select("name");
            const result = {
                User: user,
                todo: todoById,
            };
            return res.send(result);
        }
        else {
            return res.status(404).send("no todo with Id");
        }
    }
    catch (err) {
        console.log(err);
    }
};
todoController.createTodo = async (req, res) => {
    try {
        let user_id = req["user_id"];
        const { title, item } = req.body;
        const todoData = {
            title: title,
            item: item,
            user_id: user_id,
        };
        const todoTask = await todoModel_1.TodoModel.query().insertAndFetch(todoData);
        if (todoTask) {
            return res.send("todo added");
        }
        else {
            return res.status(400).send("error occured while processing");
        }
    }
    catch (err) {
        return res.send(err.message);
    }
};
todoController.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, item } = req.body;
    try {
        const updatedItem = await todoModel_1.TodoModel.query().findById(id).update({
            title: title,
            item: item,
        });
        if (updatedItem) {
            return res.sendStatus(200).send(updatedItem);
        }
        return res.status(400).send("wrong credentials");
    }
    catch (err) {
        console.log(err);
    }
};
todoController.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteduser = await todoModel_1.TodoModel.query().deleteById(id);
        if (deleteduser) {
            return res.send(`todo deleted`);
        }
        return res.status(400).send("todo not found");
    }
    catch (err) {
        console.log(err);
    }
};
