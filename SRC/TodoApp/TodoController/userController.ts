import { Tconfig } from "../Todoconfig/TodoConfig";
import express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../TodoModel/userModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { TodoSchema as Todo } from "../TodoModel/TodoModel";

export class userController {
  static getAllUser = async (req: Request, res: Response) => {
    try {
      const users = await User.find().populate("Todo", "list");
      const mytodo = await Todo.find({ users: users });

      if (users) {
        return res.send({ user: users, todo: mytodo });
      }
      return res.status(404).send("no user found");
    } catch (err) {
      console.log(err);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select("id username Todo");
      if (user) {
        return res.send(user);
      }
      return res.status(404).send("no user found");
    } catch (err) {
      console.log(err);
    }
  };

  static createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const existUser = await User.findOne({ username: username });
      if (existUser) {
        return res.status(409).send("user already exist");
      }
      const hash = bcrypt.hashSync(password, 2);
      const newUser = new User({
        username,
        password: hash,
      });
      newUser.save();

      return res.status(201).send("new User created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  static loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).send("user doesn't exist");
      }
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        return res.status(400).send("Auth failed ");
      }
      const token = Jwt.sign({ user: match }, Tconfig.JWTCODE, {
        expiresIn: "500s",
      });
      return res.send({ msg: "login successful", token: token });
    } catch (err) {
      console.log(err);
    }
  };

  static removeUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const userexist = await User.findByIdAndDelete(id);
      if (!userexist) {
        return res.sendStatus(404);
      }
      return res.send("user deleted");
    } catch (err) {
      console.log(err);
    }
  };
}
