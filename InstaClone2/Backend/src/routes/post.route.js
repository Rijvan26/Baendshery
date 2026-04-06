const express = require("express")
const postRouter = express.Router()
const multer = require("multer")
const identifyUser = require("../middleware/auth.middleware")
const storage = multer.memoryStorage()
const upload = multer({ storage })
const postController = require("../controllers/post.controller")

postRouter.post("/",upload.single("image") ,identifyUser,postController.createPostController)
postRouter.get("/",identifyUser ,postController.getPostController)

postRouter.get("/details/:postid", identifyUser, postController.getPostDetailsController)
postRouter.post("/like/:postid", identifyUser, postController.likePostController)

postRouter.get("/feed", identifyUser, postController.getFeedController)
module.exports = postRouter



