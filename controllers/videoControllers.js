import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitles: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitles: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy } });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitles: "Search", searchingBy, videos });
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
    file: { location }
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
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
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");

    res.render("video_detail", { pageTitles: `${video.title}`, video }); // model 을 pug 로 넘김 (videoBlock 의 video 변수로)
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
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("edit_video", { pageTitles: `Edit ${video.title}`, video });
    }
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

export const delete_video = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findByIdAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { comment }
  } = req;
  try {
    const video = await Video.findById(id);
    const newCommnet = await Comment.create({
      text: comment,
      creator: req.user.id
    });
    video.comments.push(newCommnet.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const editComment = async (req, res) => {
  console.log(req);
  try {
    const comment = await Comment.findById(req.user.id).populate("text");
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const deleteComment = async (req, res) => {};
