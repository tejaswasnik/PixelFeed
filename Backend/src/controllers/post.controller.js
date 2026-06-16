const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "pixelfeed",
  });
  console.log(file);
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

module.exports = {
  createPostController,
  getPostsController,
};
