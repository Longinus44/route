import { ITodo } from "./Types/ITodoModel";
import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "./UserModel";

export interface TodoModel extends ITodo {}

export class TodoModel extends Model {
  static tableName = "todo";

  $beforeInsert(context: any) {
    this.id = uuidv4();
    // this.status = "pending";
  }

  static relationMappings = {
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
