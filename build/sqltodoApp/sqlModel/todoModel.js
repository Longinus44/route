"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
class TodoModel extends objection_1.Model {
    $beforeInsert(context) {
        this.id = (0, uuid_1.v4)();
    }
}
exports.TodoModel = TodoModel;
TodoModel.tableName = "todo";
TodoModel.relationMappings = {
    item: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + "/todoItemModel",
        join: {
            from: "todo.id",
            to: "todo_item.todo_id",
        },
        filter: (query) => {
            query.select("id", "item", "status");
        },
    },
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: __dirname + "/UserModel",
        join: {
            from: "todo.user_id",
            to: "user.id",
        },
        filter: (query) => {
            query.select("name", "email");
        },
    },
};
