const express = require("express")

const authController = require("../controller/auth.controller")
const authRouter = express.Router()
const identifyUser = require("../middleware/auth.middleware")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })
const {registerValidation} = require("../validation/auth.validation")
authRouter.post("/register",upload.single("profilePic"), registerValidation, authController.registerController)

authRouter.post("/login", authController.loginController)

authRouter.get("/get-me", identifyUser, authController.getMeController)
authRouter.post("/logout",identifyUser, authController.logoutController)
authRouter.get("/suggestion", identifyUser, authController.suggestionController)
module.exports = authRouter