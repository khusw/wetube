import express from "express";
import routes from "../routes";
import {
  videos,
  getUpload,
  postUpload,
  video_detail,
  delete_video,
  postEditVideo,
  getEditVideo
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/", videos);

// upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// video detail
videoRouter.get(routes.video_detail(), video_detail);

// edit video
videoRouter.get(routes.edit_video(), getEditVideo);
videoRouter.post(routes.edit_video(), postEditVideo);

// delete video
videoRouter.get(routes.delete_video, delete_video);

export default videoRouter;
