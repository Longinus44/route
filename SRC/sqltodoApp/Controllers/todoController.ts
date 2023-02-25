import { dbConfig } from "../sqlConfig/sqlConfig";
import express, { Request, Response, NextFunction } from "express";
import { TodoModel as Todo } from "../sqlModel/todoModel";
import { UserModel } from "../sqlModel/UserModel";

export class todoController {
  static getAllTodo = async (req: Request, res: Response) => {
    try {
      const todo = await Todo.query()
        .select("id", "title", "item", "user_id")
        .withGraphFetched("user");
      if (todo.length > 0) {
        return res.send(todo);
      } else {
        return res.status(404).send("no users to display");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todoById = await Todo.query().findOne({ id: id });
      if (todoById) {
        const user = await UserModel.query()
          .findById(todoById.user_id)
          .select("name");
        const result = {
          User: user,
          todo: todoById,
        };
        return res.send(result);
      } else {
        return res.status(404).send("no todo with Id");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static createTodo = async (req: any, res: Response) => {
    try {
      let user_id = req["user_id"];
      const { title, item } = req.body;
      const todoData = {
        title: title,
        item: item,
        user_id: user_id,
      };
      const todoTask = await Todo.query().insertAndFetch(todoData);
      if (todoTask) {
        return res.send("todo added");
      } else {
        return res.status(400).send("error occured while processing");
      }
    } catch (err: any) {
      return res.send(err.message);
    }
  };

  static updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, item } = req.body;
    try {
      const updatedItem = await Todo.query().findById(id).update({
        title: title,
        item: item,
      });
      if (updatedItem) {
        return res.sendStatus(200).send(updatedItem);
      }
      return res.status(400).send("wrong credentials");
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };
}
