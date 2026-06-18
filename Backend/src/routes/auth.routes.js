const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();
const authUser = require("../middlewares/auth.middleware");
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController);
/**
 * @route POST /api/auth/login
 * @desc Login existing user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

authRouter.get("/getMe", authUser, authController.getMeController);
module.exports = authRouter;
