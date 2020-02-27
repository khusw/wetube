import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  addComment,
  deleteComment
} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComments, addComment);
apiRouter.delete(routes.certainComment, deleteComment);

export default apiRouter;
