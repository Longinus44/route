import express, { Request, Response, NextFunction } from "express";
import { todoController } from "../Controllers/todoController";
import { todoValidator } from "../middleWares/todoValidator";
import { validate } from "../middleWares/signupValidator";
import { authorisedUser } from "../Auth/userAuth";
import { check_token } from "../Auth/userToken";

const router = express.Router();

router.get("/", authorisedUser, check_token, todoController.getAllTodo);

router.get(
  "/by-id/:id",
  authorisedUser,
  check_token,
  todoController.getTodoById
);

router.post(
  "/create",
  authorisedUser,
  check_token,
  todoValidator,
  validate,
  todoController.createTodo
);

router.patch("/:id", authorisedUser, check_token, todoController.updateTodo);

router.delete("/:id", authorisedUser, check_token, todoController.deleteTodo);

export default router;
