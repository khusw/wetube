import passport from "passport";
import routes from "../routes";
import userModel from "../models/User";

// join
export const getJoin = (req, res) => {
  res.render("join", { pageTitles: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    req.flash("error", "password can't match");
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

// google
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: { sub, name, picture, email }
  } = profile;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      (user.id = sub), user.save();
      return cb(null, user);
    }
    const newUser = await userModel.create({
      name,
      googleId: sub,
      avatarUrl: picture,
      email
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
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

export const getMe = async (req, res) => {
  const {
    user: { id }
  } = req;
  const user = await userModel.findById(id).populate("videos");
  res.render("user_detail", { pageTitles: "user_detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await userModel.findById(id).populate("videos");
    res.render("user_detail", { pageTitles: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("edit_profile", { pageTitles: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    await userModel.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(rouets.edit_profile);
  }
};

export const getChangePassword = (req, res) => {
  res.render("change_password", { pageTitles: "Change_Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { current_password, new_password, verify_new_password }
  } = req;

  try {
    if (new_password !== verify_new_password) {
      res.status(400);
      res.redirect(`/users${routes.change_password}`);
      return;
    }
    await req.user.changePassword(current_password, new_password); // mongoose-local-passport API 에 서술된 메소드
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.change_password}`);
  }
};
