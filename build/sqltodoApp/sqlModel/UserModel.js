"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
class UserModel extends objection_1.Model {
    $beforeInsert(context) {
        this.id = (0, uuid_1.v4)();
    }
}
exports.UserModel = UserModel;
UserModel.tableName = "user";
UserModel.relationMappings = {
    todo: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + "/todoModel",
        join: {
            from: "user.id",
            to: "todo.user_id",
        },
        filter: (query) => {
            query.select("title", "id", "status");
        },
    },
};
