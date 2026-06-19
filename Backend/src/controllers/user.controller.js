const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

async function getProfileController(req, res) {
  try {
    const username = req.params.username;
    const currentUsername = req.user.username;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const posts = await postModel.find({ user: user._id }).sort({ _id: -1 });

    const followersCount = await followModel.countDocuments({
      followee: username,
    });
    const followingCount = await followModel.countDocuments({
      follower: username,
    });

    const isFollowing = await followModel.findOne({
      follower: currentUsername,
      followee: username,
    });

    res.status(200).json({
      message: "Profile fetched successfully.",
      profile: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
      posts,
      followersCount,
      followingCount,
      isFollowing: !!isFollowing,
      postsCount: posts.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

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
  getProfileController,
  followController,
  unfollowController,
};
