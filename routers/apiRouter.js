import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  addComment,
  editComment,
  deleteComment
} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComments, addComment);
apiRouter.post(routes.editComment, editComment);
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;
