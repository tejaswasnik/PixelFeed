const express = require("express");
const userRouter = express.Router();
const authUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:followee", authUser, userController.followController);
/**
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post(
  "/unfollow/:followee",
  authUser,
  userController.unfollowController,
);

module.exports = userRouter;
