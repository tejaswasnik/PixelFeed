require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
module.exports = app;
