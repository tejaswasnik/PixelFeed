const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already registered"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default:
        "https://ik.imagekit.io/pgt5y5hyw/default-avatar-profile-icon-social-600nw-1906669723.webp?updatedAt=1774703880399",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
