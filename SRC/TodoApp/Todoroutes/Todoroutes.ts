import express, { Request, Response, NextFunction } from "express";
import { TodoController } from "../TodoController/TodoController";
import { auth } from "../TodoMiddlewares/TodoAuth";

const router = express.Router();

router.get("/", auth, TodoController.getAllTodo);
router.get("/by-id/:id", auth, TodoController.getTodoById);
router.post("/create", auth, TodoController.createTodo);
router.patch("/:id", auth, TodoController.updateTodo);
router.delete("/by-id/:id", auth, TodoController.deleteTodo);

export default router;
