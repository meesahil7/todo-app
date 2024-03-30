const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

module.exports = { userRouter };
