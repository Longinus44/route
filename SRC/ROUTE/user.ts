import express, { Router } from "express";
import { deletebyEmail } from "../CONTROLLER/deletecontroller";
import { updateUser } from "../CONTROLLER/patchcontroller";
import getcontroller from "../CONTROLLER/getcontroller";
import { deleteUser } from "../CONTROLLER/deletecontroller";
import { registerUser } from "../CONTROLLER/registercontroller";
import { loginUser } from "../CONTROLLER/logincontroller";
import { signupvalidator } from "../MIDDLEWARE/signup_validator";

const router = express.Router();

router.get("/", getcontroller.getUser);
router.get("/get-by-id/:id", getcontroller.getUserById);
router.get("/get-by-email/:email", getcontroller.getUserByEmail);
router.post("/register", signupvalidator, registerUser);
router.post("/login", loginUser);
router.patch("/:id", updateUser);
router.delete("/by-id/:id", deleteUser);
router.delete("/by-email/:email", deletebyEmail);

export default router;
