const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")
async function followerController(req,res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if(followeeUsername === followerUsername){
      return  res.status(400).json({
            message:"you can not follow yourself"
        })
    }


    const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
      return  res.status(404).json({
            message:"this user not exist",
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing){
      return  res.status(200).json({
            message:"you already followed",
            follow:isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message:`you are following ${followeeUsername}`,
        follow:followRecord
    })
}

async function unFollowController(req,res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee:followeeUsername
    })

    if(!isUserFollowing){
        return   res.status(403).json({
            message:"you are not following this user"
           })
    }

  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message:"unfollowed successfully"
  })


}

module.exports = {
    followerController,
    unFollowController
}