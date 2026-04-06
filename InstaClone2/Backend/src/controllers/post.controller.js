require("dotenv").config()
const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs/index.js")
const {toFile} = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res) {
      

       const file = await imagekit.files.upload({
              file: await toFile(Buffer.from(req.file.buffer), "file"),
              fileName: "prac",
              folder:"pract-Instaclone"
          })

      const post = await postModel.create({
        caption:req.body.caption,
        img_Url:file.url,
        user: req.user.id
      })

        res.status(201).json({
        message:"posted successfully",
        post
    })
}

// get post for user profile
async function getPostController (req,res) {
    

      const userId = req.user.id
      const posts = await postModel.find({
        user:userId
      })

      res.status(200).json({
        message:"post fetched successfully",
        posts
      })
}

async function getPostDetailsController(req,res){
    

      const postId = req.params.postid
      const userId = req.user.id

      const post = await postModel.findById(postId)
       if(!post){
            return res.status(404).json({
                message:"post not found"
            })
        }

        res.status(200).json({
            message:"post fetched successfully",
            post
        })
}


async function likePostController(req,res) {
  const username = req.user.username
  const postId = req.params.postid

  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
          message:"post not found"
    })
  }

  const like = await likeModel.create({
    post:postId,
    user:username
  })
  res.status(201).json({
    message:"post liked successfuly",
    like
  })
}

async function getFeedController (req,res) {

 const user = req.user


    const posts = await Promise.all((await postModel.find({}).sort({_id: -1}).populate("user").lean())

    .map(async (post) => {
        const isLiked  = await likeModel.findOne({
        user:user.username,
        post:post._id
    })
       post.isLiked = Boolean(isLiked)

     return post

    }))

  res.status(200).json({
    message:"post fetched successfully",
    posts
  })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
}