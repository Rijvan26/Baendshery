require("dotenv").config()
const postModel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs/index.js")
const {toFile} = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken")
const likeModel = require("../model/likes.model")
const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res) {
   

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder:"cohort2-Instaclone"
    })


    const post = await postModel.create({
        caption: req.body.caption,
      Image_url: file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"posted successfully",
        post
    })
}

async function getPostController(req,res) {
    

    const userId = req.user.id
    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res) {
    
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post) {
     return   res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:" not valid found"
        })
    
    }

    return res.status(200).json({
        message:"post fetched successfullly",
        post
    })
}

async function likePostController (req,res) {
    const username =  req.user.username
    const postId = req.params.postId

    const post =  await postModel.findById(postId)

    if(!post){
      return  res.status(404).json({
        message:"post not found"
      })
    }

    const isExistingLike = await likeModel.findOne({post:postId, user:username})

    if(isExistingLike) {
          await likeModel.findByIdAndDelete({_id: isExistingLike._id})
    return res.status(200).json({
        message:"post disliked successfully"
    })
    }
   const like = await likeModel.create({
    post:postId,
    user:username
   })

   res.status(201).json({
    message:"post liked successfully",
    like
   })
}

async function unLikePostController (req,res) {
    const postId = req.params.postId
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post:postId,
        user:username
    })

    if(!isLiked){
        return res.status(400).json({
            message:"post didnt liket yet"
        })
    }

    await likeModel.findByIdAndDelete({_id: isLiked._id})
    return res.status(200).json({
        message:"post disliked successfully"
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
    const isFollowing = await followModel.findOne({
        follower:user.username,
        followee: post.user.username
    })
       post.isLiked = Boolean(isLiked)
         post.isFollowing = Boolean(isFollowing)
     return post

    }))

    

    res.status(200).json({
        message:"all post fecthed successfully",
        posts
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController,

}