const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

const blackListModel = require("../models/blacklist.model")
 async function authUser(req,res,next) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message:"unauthorised access"
        })
    }

    const isTokenBlackList =  await redis.get(token)

    if(isTokenBlackList){
        return res.status(400).json({
            message:"invalid token"
        })
    }
       let decoded = null
    try {
         decoded =  jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        return res.status(403).json({
            message:"invalid or expired token"
        })
    }

    
        req.user = decoded

        next()

console.log("DECODED:", decoded)
        console.log("TOKEN:", token)
}


module.exports = {authUser}