import express from "express";
import routes from "../routes";
import {
  videos,
  upload,
  video_detail,
  edit_video,
  delete_video
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos);

videoRouter.get(routes.upload, upload);

videoRouter.get(routes.video_detail, video_detail);

videoRouter.get(routes.edit_video, edit_video);

videoRouter.get(routes.delete_video, delete_video);

export default videoRouter;
