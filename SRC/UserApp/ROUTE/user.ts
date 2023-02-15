import express from "express";
import { signupvalidator } from "../MIDDLEWARE/signup_validator";
import { bodyvalidator } from "../MIDDLEWARE/signupschema";
import { Usercontroller } from "../CONTROLLER/userController";

const router = express.Router();

router.get("/", Usercontroller.getAlluser);
router.get("/get-by-id/:id", Usercontroller.getUserById);
router.get("/get-by-email/:email", Usercontroller.getUserByEmail);
router.post(
  "/register",
  bodyvalidator,
  signupvalidator,
  Usercontroller.registerUser
);
router.post("/login", Usercontroller.loginUser);
router.patch("/:id", Usercontroller.updateUser);
router.delete("/by-id/:id", Usercontroller.deleteUserById);
router.delete("/by-email/:email", Usercontroller.deleteUserByEmail);

export default router;
