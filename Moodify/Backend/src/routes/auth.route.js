const express = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()
const authMiddleware = require("../middleware/auth.middleware")

authRouter.post("/register", authController.registerController)
authRouter.post("/login", authController.loginController)

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)
authRouter.get("/logout", authController.logoutController)

module.exports = authRouter