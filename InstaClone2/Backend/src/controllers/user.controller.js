require("dotenv").config()
const jwt = require("jsonwebtoken")
const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res) {
    const followeeUsername = req.params.username
    const followerUsername = req.user.username

const isFolloweeExists = await userModel.findOne({
    username:followeeUsername
})

if(!isFolloweeExists) {
    return res.status(403).json({
        message:"user does not exist"
    })
}
    if(followerUsername === followeeUsername){
        return res.status(403).json({
            message:"you cant follow yourself"
        })
    }

    const isAlreadyFollow = await followModel.findOne({
        followee:followeeUsername,
        follower:followerUsername
    })

    if(isAlreadyFollow){
        return res.status(403).json({
            message:"you already follow"
        })
    }


    const followRecord = await followModel.create({
          follower:followerUsername,
          followee:followeeUsername
    })

    res.status(201).json({
        message:"followed successfully",
        followRecord
    })
}

async function unFollowUserController(req,res){
    const followeeUsername = req.params.username
     const folllowerUsername = req.user.username

     const isUserFollowing = await followModel.findOne({
        followee:followeeUsername,
        follower:folllowerUsername
     })

     if(!isUserFollowing){
        return res.status({
            message:"you already follow "
        })
     }

   await followModel.findByIdAndDelete(
    isUserFollowing.id
   )

   res.status(200).json({
    message:"unfollow successfully"
   })
}

module.exports = {
    followUserController,
    unFollowUserController,
}
