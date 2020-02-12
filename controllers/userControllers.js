import routes from "../routes";
import userModel from "../models/User";
import passport from "passport";

// join
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

// local login
export const getLogin = (req, res) => {
  res.render("login", { pageTitles: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

// github
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  const user = await userModel.findOne({ email: email });

  if (user) {
    user.githubId = id;
    user.save();
    return cb(null, user); // 찾았으면 두번째 인자를 리턴, 못 찾았으면 null 을 리턴
  }

  const newUser = await userModel.create({
    email: email,
    name: name,
    githubId: id,
    avatarUrl: avatar_url
  });

  return cb(null, newUser);
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// logout
export const logout = (req, res) => {
  req.logout();
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
