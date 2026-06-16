const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const authUser = require("../middlewares/auth.middleware");
/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */
postRouter.post(
  "/",
  upload.single("imgURL"),
  authUser,
  postController.createPostController,
);
/**
 * @route GET /api/posts [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
postRouter.get("/",authUser, postController.getPostsController)

/**
 * @route GET /api/posts/:postId [protected]
 * @description Get a specific post by its ID created by the user that the request come from
 */
postRouter.get("/:postId", authUser, postController.getPostController);

/**
 * @route POST /api/like/:postId [protected]
 * @description Like a specific post by its ID
 */
postRouter.post("/like/:postId", authUser, postController.likePostController);
/**
 * @route POST /api/unlike/:postId [protected]
 * @description Unlike a specific post by its ID
 */
postRouter.post("/unlike/:postId", authUser, postController.unlikePostController);
module.exports = postRouter;
