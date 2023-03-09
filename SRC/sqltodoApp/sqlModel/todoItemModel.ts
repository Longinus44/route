import { ITodoitem } from "./Types/ITodoItemModel";
import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";
import { TodoModel } from "./todoModel";

export interface ItemModel extends ITodoitem {}

export class ItemModel extends Model {
  static tableName = "todo_item";

  $beforeInsert(context: any) {
    this.id = uuidv4();
    // this.todo_id =TodoModel.;
  }

  static relationMappings = {
    todo: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/TodoModel",
      join: {
        from: "todo_item.todo_id",
        to: "todo.id",
      },
      filter: (query: any) => {
        query.select("title", "status");
      },
    },
  };
}
