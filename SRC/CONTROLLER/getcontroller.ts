import Express, { Request, Response, NextFunction } from "express";
import { userModel as User } from "../MODEL/userModel";

const router = Express.Router();

const getUser = (req: Request, res: Response) => {
  User.find()
    .select(
      "firstname lastname othername email password date_of_birth state_of_origin"
    )
    .then((user) => {
      if (user) {
        res.status(200).send({
          count: user.length,
          user: user,
        });
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(400).send("wrong input");
    });
};

const getUserByEmail = (req: Request, res: Response) => {
  const email = req.params.email;
  User.find({ email: email })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    })
    .catch((err) => {
      res.status(400).send("wrong input");
    });
};

export default {
  getUser,
  getUserById,
  getUserByEmail,
};
