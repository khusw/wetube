export const home = (req, res) => {
  res.render("home", { pageTitles: "Home" });
};
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitles: "Search", searchingBy: searchingBy });
};

export const videos = (req, res) => {
  res.render("videos", { pageTitles: "Videos" });
};
export const upload = (req, res) => {
  res.render("upload", { pageTitles: "Upload" });
};
export const video_detail = (req, res) => {
  res.render("video_detail", { pageTitles: "Video_Detail" });
};
export const edit_video = (req, res) => {
  res.render("edit_video", { pageTitles: "Edit_Video" });
};
export const delete_video = (req, res) => {
  res.render("delete_video", { pageTitles: "Delete_Video" });
};
