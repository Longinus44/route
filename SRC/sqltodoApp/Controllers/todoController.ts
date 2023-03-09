import { Request, Response, NextFunction, json } from "express";
import { TodoModel as Todo, TodoModel } from "../sqlModel/todoModel";
import { ItemModel } from "../sqlModel/todoItemModel";

export class todoController {
  static getAllTodo = async (req: Request, res: Response) => {
    try {
      const todo = await Todo.query()
        .select("id", "title", "user_id", "status")
        .withGraphFetched("user")
        .withGraphFetched("item");

      if (todo.length > 0) {
        return res.send({ todo: todo });
      } else {
        return res.status(404).send("no users to display");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  static getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todoById = await Todo.query()
        .findOne({ id: id })
        .withGraphFetched("user")
        .withGraphFetched("item");
      if (todoById) {
        return res.send(todoById);
      } else {
        return res.status(404).send("no todo with Id");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  static getUserTodo = async (req: any, res: Response) => {
    try {
      const user_id = req["user_id"];
      const id = user_id;
      const todo = await TodoModel.query()
        .select("id", "title", "status", "user_id")
        .where({ user_id: id })
        .withGraphFetched("item");
      return res.send(todo);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  };

  static createTodo = async (req: any, res: Response) => {
    try {
      let user_id = req["user_id"];
      const { title, items } = req.body;
      const todoData = {
        title: title,
        user_id: user_id,
      };
      const todoTask = await Todo.query().insertAndFetch(todoData);

      for await (let item of items as Array<string>) {
        const itemData = {
          item: item,
          todo_id: todoTask.id,
        };
        const todoItem = await ItemModel.query().insert(itemData);
      }
      if (todoTask) {
        return res.status(201).send("todo created");
      } else {
        return res.status(400).send("error occured while processing");
      }
    } catch (err: any) {
      return res.send(err.message);
    }
  };

  static updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const updatedItem = await Todo.query().updateAndFetchById(id, {
        title: title,
      });
      if (updatedItem) {
        return res.status(200).send(updatedItem);
      } else {
        return res.status(400).send("wrong credentials");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  static deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteduser = await Todo.query().deleteById(id);
      if (deleteduser) {
        return res.send(`todo deleted`);
      }
      return res.status(400).send("todo not found");
    } catch (err: any) {
      return res.send(err.message);
    }
  };
}
