import express from "express";
import routes from "../routes";
import { postRegisterView, addComment } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComments, addComment);

export default apiRouter;
