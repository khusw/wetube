import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitles: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitles: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", {
    pageTitles: "Search",
    searchingBy: searchingBy,
    videos_a
  });
};

export const videos = (req, res) => {
  res.render("videos", { pageTitles: "Videos" });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitles: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description
    });
    res.redirect(routes.video_detail(newVideo.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.upload);
  }
};

export const video_detail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("video_detail", { pageTitles: "Video_Detail", video }); // model 을 pug 로 넘김 (videoBlock 의 video 변수로)
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("edit_video", { pageTitles: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const delete_video = (req, res) => {
  res.render("delete_video", { pageTitles: "Delete_Video" });
};
