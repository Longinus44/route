import { IUser } from "./Types/IUserModel";
import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";

export interface UserModel extends IUser {}

export class UserModel extends Model {
  static tableName = "user";

  $beforeInsert(context: any) {
    this.id = uuidv4();
  }
  static relationMappings = {
    todo: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/todoModel",
      join: {
        from: "user.id",
        to: "todo.user_id",
      },
      filter: (query: any) => {
        query.select("title", "id", "status");
      },
    },
  };
}
