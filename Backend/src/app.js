require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const userRouter = require("../src/routes/user.routes");
const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
module.exports = app;
