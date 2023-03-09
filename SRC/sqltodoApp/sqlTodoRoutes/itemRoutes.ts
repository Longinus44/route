import express from "express";
import { itemController } from "../Controllers/itemController";
import { authorisedUser } from "../Auth/userAuth";
import { check_token } from "../Auth/userToken";
import { statusCheck } from "../middleWares/itemStatusOption";

const router = express.Router();

router.get("/", authorisedUser, check_token, itemController.getAllItem);
router.get("/:id", authorisedUser, check_token, itemController.getAllItemById);
router.patch(
  "/by-id/:id",
  authorisedUser,
  check_token,
  itemController.updateItem
);
router.patch(
  "/:id",
  authorisedUser,
  check_token,
  statusCheck,
  itemController.updateItemStatus
);
router.delete("/:id", authorisedUser, check_token, itemController.deleteItem);

export default router;
