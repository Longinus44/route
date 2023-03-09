"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
class ItemModel extends objection_1.Model {
    $beforeInsert(context) {
        this.id = (0, uuid_1.v4)();
        // this.todo_id =TodoModel.;
    }
}
exports.ItemModel = ItemModel;
ItemModel.tableName = "todo_item";
ItemModel.relationMappings = {
    todo: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: __dirname + "/TodoModel",
        join: {
            from: "todo_item.todo_id",
            to: "todo.id",
        },
        filter: (query) => {
            query.select("title", "status");
        },
    },
};
