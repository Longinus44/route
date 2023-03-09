"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const todoModel_1 = require("../sqlModel/todoModel");
const todoItemModel_1 = require("../sqlModel/todoItemModel");
class todoController {
}
exports.todoController = todoController;
_a = todoController;
todoController.getAllTodo = async (req, res) => {
    try {
        const todo = await todoModel_1.TodoModel.query()
            .select("id", "title", "user_id", "status")
            .withGraphFetched("user")
            .withGraphFetched("item");
        if (todo.length > 0) {
            return res.send({ todo: todo });
        }
        else {
            return res.status(404).send("no users to display");
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
todoController.getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todoById = await todoModel_1.TodoModel.query()
            .findOne({ id: id })
            .withGraphFetched("user")
            .withGraphFetched("item");
        if (todoById) {
            return res.send(todoById);
        }
        else {
            return res.status(404).send("no todo with Id");
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
todoController.getUserTodo = async (req, res) => {
    try {
        const user_id = req["user_id"];
        const { id } = req.params;
        const todo = await todoModel_1.TodoModel.query()
            .where({ user_id: id })
            .withGraphFetched("user")
            .withGraphFetched("item");
        // const todo_id = todo.filter(async (todo) => {
        //   return await todo.user_id;
        // });
        console.log(todo.length);
        res.send(todo);
        const result = await todoModel_1.TodoModel.query()
            .select("title", "status")
            .where({ todo_id: user_id });
        return res.send(result);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
todoController.createTodo = async (req, res) => {
    var e_1, _b;
    try {
        let user_id = req["user_id"];
        const { title, items } = req.body;
        const todoData = {
            title: title,
            user_id: user_id,
        };
        const todoTask = await todoModel_1.TodoModel.query().insertAndFetch(todoData);
        try {
            for (var _c = __asyncValues(items), _d; _d = await _c.next(), !_d.done;) {
                let item = _d.value;
                const itemData = {
                    item: item,
                    todo_id: todoTask.id,
                };
                const todoItem = await todoItemModel_1.ItemModel.query().insert(itemData);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) await _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (todoTask) {
            return res.status(201).send("todo created");
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
        });
        if (updatedItem) {
            return res.sendStatus(200).send(updatedItem);
        }
        return res.status(400).send("wrong credentials");
    }
    catch (err) {
        return res.send(err.message);
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
        return res.send(err.message);
    }
};
