import express from "express";
import routes from "../routes";
import {
  users,
  user_detail,
  edit_profile,
  change_password
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/", users);

userRouter.get(routes.edit_profile, edit_profile);

userRouter.get(routes.user_detail(), user_detail);

userRouter.get(routes.change_password, change_password);

export default userRouter;
