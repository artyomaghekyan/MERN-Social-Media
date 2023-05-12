import express from "express";
import { postCreationValidator } from "../validation/auth.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import * as PostController from "../controllers/PostController.js";
const postRouter = express.Router();

postRouter.get("/posts", PostController.getAll);
postRouter.get("/posts/:id/", PostController.getOne);
postRouter.post(
  "/posts",
  checkAuth,
  postCreationValidator,
  PostController.create
);
postRouter.patch(
  "/posts/:id/",
  checkAuth,
  postCreationValidator,
  PostController.update
);
postRouter.delete("/posts/:id/", checkAuth, PostController.remove);

export default postRouter;
