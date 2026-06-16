const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
async function registerController(req, res) {
  const { username, name, gender, email, password, bio, profilePicture } =
    req.body;
  isUserExist = await userModel.findOne({ $or: [{ username }, { email }] });
  if (isUserExist) {
    res.status(409).json({
      message: "User already registered. Please login.",
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await userModel.create({
    username,
    name,
    gender,
    email,
    password: hashedPassword,
    bio,
    profilePicture,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully.",
    user,
    token,
  });
}

async function loginController(req, res) {}

module.exports = {
  registerController,
  loginController,
};
