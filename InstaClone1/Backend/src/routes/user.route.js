const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middleware/auth.middleware")
const userRouter = express.Router()

userRouter.post("/follow/:username", identifyUser, userController.followerController )

userRouter.post("/unfollow/:username", identifyUser, userController.unFollowController)

module.exports = userRouter