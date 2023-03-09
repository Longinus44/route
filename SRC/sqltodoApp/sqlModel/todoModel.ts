import { ITodo } from "./Types/ITodoModel";
import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";

export interface TodoModel extends ITodo {}

export class TodoModel extends Model {
  static tableName = "todo";

  $beforeInsert(context: any) {
    this.id = uuidv4();
  }

  static relationMappings = {
    item: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/todoItemModel",
      join: {
        from: "todo.id",
        to: "todo_item.todo_id",
      },
      filter: (query: any) => {
        query.select("id", "item", "status", "todo_id");
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/UserModel",
      join: {
        from: "todo.user_id",
        to: "user.id",
      },
      filter: (query: any) => {
        query.select("name", "email");
      },
    },
  };
}
