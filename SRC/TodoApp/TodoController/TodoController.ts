import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { TodoSchema as Todo } from "../TodoModel/TodoModel";
import { userModel as User } from "../TodoModel/userModel";

export class TodoController {
  static getAllTodo = async (req: Request, res: Response) => {
    try {
      const AllTodo = await Todo.find().populate("user", "username");
      if (!AllTodo) {
        return res.status(404).send("list is empty");
      }
      return res.send(AllTodo);
    } catch (err) {
      console.log(err);
    }
  };

  static getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todoitem = await Todo.findById(id);
      if (!todoitem) {
        return res.status(404).send("no todo found");
      }
      const user = await User.findOne(todoitem.user).select("id username ");
      return res.send({ user: user, Todo: todoitem });
    } catch (err) {
      console.log(err);
    }
  };

  static createTodo = async (req: Request, res: Response) => {
    const { Title, list, user } = req.body;
    try {
      const userExist = await User.findById(user);
      if (!userExist) {
        return res.status(400).send("unauthorized user");
      }
      const todoItem = new Todo({
        Title,
        list,
        user,
      });
      if (!todoItem) {
        return res.status(401).send("fill the required ");
      }
      await todoItem.save();
      return res.send(todoItem);
    } catch (err) {
      res.send("user with id not found");
    }
  };

  static updateTodo = async (req: Request, res: Response) => {
    const { Title, list } = req.body;
    const id = req.params.id;
    try {
      const editTodo = await Todo.findByIdAndUpdate(
        { _id: id },
        { $set: { Title, list } },
        { new: true }
      );
      return res.send(editTodo);
    } catch (err) {
      console.log(err);
    }
  };

  static deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const todotodelete = await Todo.findByIdAndDelete(id);
      if (todotodelete) {
        return res.send("item deleted successfully");
      }
      return res.status(404).send("item not found");
    } catch (err) {
      console.log(err);
    }
  };
}
