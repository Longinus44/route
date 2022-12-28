import Express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../MODEL/userModel";

const router = Express.Router();

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname } = req.body;
  User.findByIdAndUpdate(
    { _id: id },
    { $set: { firstname, lastname } },
    { new: true }
  )
    .then((user) => {
      res.send({
        user,
        updated_at: new Date(),
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
