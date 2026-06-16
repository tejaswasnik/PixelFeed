const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
async function followController(req, res) {
  const follower = req.user.username;
  const followee = req.params.followee;
  if (followee == follower) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followee,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: follower,
    followee: followee,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followee}`,
      follow: isAlreadyFollowing,
    });
  }
  const followRecord = await followModel.create({
    follower,
    followee,
  });

  res.status(200).json({
    message: `You are now following ${followee}`,
    followRecord,
  });
}

async function unfollowController(req, res) {
  const follower = req.user.username;
  const followee = req.params.followee;

  const isUserFollowing = await followModel.findOne({
    follower: follower,
    followee: followee,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followee}`,
    });
  }
  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followee}`,
  });
}

module.exports = {
  followController,
  unfollowController,
};
