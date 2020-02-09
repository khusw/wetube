import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitles: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitles: "Join" });
  } else {
    // TODO : Register User
    // TODO : Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitles: "Login" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

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
