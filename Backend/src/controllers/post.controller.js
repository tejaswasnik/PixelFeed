const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
const likeModel = require("../models/like.model");
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "pixelfeed",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

async function getPostsController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "all posts fetched successfully.",
    posts,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() == userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }
  const like = await likeModel.create({
    post: postId,
    username: username,
  });

  res.status(201).json({
    message: "Post liked successfully.",
    like,
  });
}

async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not Found.",
    });
  }

  const unlike = await likeModel.findOneAndDelete({
    post: postId,
    username: username,
  });
  res.status(200).json({
    message: "unliked successfully.",
    unlike,
  });
}

async function getFeedController(req, res) {
  try {
    const user = req.user;

    const posts = await Promise.all(
      (await postModel.find().populate("user")).map(async (post) => {
        const isLiked = await likeModel.findOne({
          username: user.username,
          post: post._id,
        });

        const postObj = post.toObject();
        postObj.isLiked = !!isLiked;

        return postObj;
      }),
    );

    res.status(200).json({
      message: "Posts fetched successfully.",
      posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  createPostController,
  getPostsController,
  getPostController,
  likePostController,
  unlikePostController,
  getFeedController,
};
