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

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");
  if (!user) {
    return res.status(404).json({
      message: "User not found. Please register.",
    });
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid Credentials.",
    });
  }

  const token = await jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User LoggedIn Successfully.",
    user,
  });
}

async function getMeController(req, res) {
  userId = req.user.id;
  const user = await userModel.findById(userId);

  if(!user) {
    return res.status(404),json({
      message: "User does not exist."
    })
  }

  res.status(200).json({
    message: "Data Fetched Successfully.",
    user
  })
}

module.exports = {
  registerController,
  loginController,
  getMeController,
};
