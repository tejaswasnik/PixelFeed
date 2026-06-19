const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required for creating a like"],
    },
    username: {
      type: String,
      required: [true, "username is required for creating a like"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ post: 1, username: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
