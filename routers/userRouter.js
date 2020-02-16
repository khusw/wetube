import express from "express";
import routes from "../routes";
import {
  users,
  user_detail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from "../controllers/userControllers";

import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", users);

// edit profile
userRouter.get(routes.edit_profile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.edit_profile,
  onlyPrivate,
  uploadAvatar,
  postEditProfile
);

userRouter.get(routes.user_detail(), user_detail);

// change password
userRouter.get(routes.change_password, onlyPrivate, getChangePassword);
userRouter.post(routes.change_password, onlyPrivate, postChangePassword);

export default userRouter;
