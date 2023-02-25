"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
const UserModel_1 = require("./UserModel");
class TodoModel extends objection_1.Model {
    $beforeInsert(context) {
        this.id = (0, uuid_1.v4)();
        // this.status = "pending";
    }
}
exports.TodoModel = TodoModel;
TodoModel.tableName = "todo";
TodoModel.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: UserModel_1.UserModel,
        join: {
            from: "todo.user_id",
            to: "user.id",
        },
        filter: (query) => {
            query.select("name", "email");
        },
    },
};
