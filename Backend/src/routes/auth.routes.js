const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

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
module.exports = authRouter;
