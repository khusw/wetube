export const join = (req, res) => {
  res.render("join", { pageTitles: "Join" });
};
export const login = (req, res) => {
  res.render("login", { pageTitles: "Login" });
};
export const logout = (req, res) => {
  res.render("logout", { pageTitles: "Logout" });
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
