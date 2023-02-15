import express, { Request, Response, NextFunction } from "express";
import { userController } from "../TodoController/userController";
import { bodyAuth } from "../TodoMiddlewares/bodyAuth";
import { validatesignup } from "../TodoMiddlewares/signupValidator";
import { auth } from "../TodoMiddlewares/TodoAuth";

const router = express();

router.get("/", userController.getAllUser);
router.get("/by-id/:id", auth, userController.getUserById);
router.post("/signup", bodyAuth, validatesignup, userController.createUser);
router.post("/login", bodyAuth, validatesignup, userController.loginUser);
//  router.patch("/:id");
router.delete("/by-id/:id", userController.removeUser);

export default router;
