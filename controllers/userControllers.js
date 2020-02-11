import routes from "../routes";
import userModel from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitles: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitles: "Join" });
  } else {
    try {
      const user = await userModel({
        name,
        email
      });
      await userModel.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitles: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  // TODO : make process log out
  res.redirect(routes.home);
};

export const users = (req, res) => {
  res.render("users", { pageTitles: "Users" });
};

export const user_detail = (req, res) => {
  res.render("user_detail", { pageTitles: "User_Detail" });
};

export const edit_profile = (req, res) => {
  res.render("edit_profile", { pageTitles: "Edit_Profile" });
};

export const change_password = (req, res) => {
  res.render("change_password", { pageTitles: "Change_Password" });
};
