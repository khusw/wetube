import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoControllers";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe,
  googleLogin,
  postGoogleLogin
} from "../controllers/userControllers";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

// home
globalRouter.get(routes.home, home);

// join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// logout
globalRouter.get(routes.logout, onlyPrivate, logout);

// search
globalRouter.get(routes.search, search);

// github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: `${routes.login}` }),
  postGithubLogin
);

// facebook
globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: `${routes.login}` }),
  postGoogleLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
