import express from "express";
import { userController } from "../Controllers/userController";
import { bodyValidator } from "../middleWares/bodyValidator";
import { validate } from "../middleWares/signupValidator";
import { loginValidator } from "../middleWares/loginValidator";
import { authorisedUser } from "../Auth/userAuth";
import { check_token } from "../Auth/userToken";

const router = express.Router();

router.get("/", userController.getAllUser);

router.get("/:id", authorisedUser, check_token, userController.getUserById);

router.post("/signup", bodyValidator, validate, userController.createUser);

router.post("/login", loginValidator, validate, userController.loginUser);

router.patch("/:id", authorisedUser, check_token, userController.updateUser);

// router.delete("/:id", userController.deleteUser);

export default router;
