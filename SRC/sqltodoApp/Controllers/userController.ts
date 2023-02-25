import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../sqlModel/UserModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { dbConfig } from "../sqlConfig/sqlConfig";

export class userController {
  static getAllUser = async (req: Request, res: Response) => {
    try {
      const user = await UserModel.query()
        .select("id", "name", "email")
        .withGraphFetched("todo");
      if (!user.length) {
        return res.status(404).send("no user found");
      } else {
        return res.send(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userWithId = await UserModel.query()
        .findById(id)
        .select("id", "name", "email")
        .withGraphFetched("todo");
      if (userWithId) {
        return res.send(userWithId);
      }
      return res.status(404).send("user with Id not found");
    } catch (err) {
      console.log(err);
    }
  };

  static createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 7);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    try {
      const userExist = await UserModel.query().where({ email: email });
      if (!userExist.length) {
        const savedUser = await UserModel.query().insert(newUser);
        return res
          .status(201)
          .send({ message: "user created", user: savedUser });
      } else {
        return res.status(409).send("user already exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userExist = await UserModel.query().findOne({ email: email });
      if (userExist) {
        const isMatch = bcrypt.compareSync(password, userExist.password);
        if (isMatch) {
          const token = Jwt.sign({ user_id: userExist.id }, dbConfig.jwtkey, {
            expiresIn: "1h",
          });
          return res.send(token);
        }
        return res.status(401).send("wrong email/passsword ");
      }
      return res.status(404).send("user doesn't exist");
    } catch (err) {
      console.log(err);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const usertopatch = await UserModel.query()
        .findById(id)
        .update({ name: name });
      if (usertopatch) {
        return res.status(200).send("user updated");
      } else {
        return res.status(404).send("user not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedUser = await UserModel.query().deleteById(id);
      if (deletedUser) {
        return res.send("user deleted");
      } else {
        return res.status(404).send("user with ID no found");
      }
    } catch (err) {
      console.log(err);
    }
  };
}
