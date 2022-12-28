import Express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../MODEL/userModel";

const router = Express.Router();

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      res.send("user deleted");
    })
    .catch((err) => {
      res.status(404).send("user with id not found");
    });
};

export const deletebyEmail = (req: Request, res: Response) => {
  const email = req.params.email;
  User.deleteOne({ email })
    .then((user) => {
      res.send("user deleted");
    })
    .catch((err) => {
      res.send("user with email not found");
    });
};
