const jwt = require("jsonwebtoken")

 function identifyUser(req,res,next) {

     const token = req.cookies.token
        if(!token) {
            return res.status(401).json({
                message:"unauthorised access"
            })
        }
        let decoded = null
        try{
         decoded = jwt.verify(token, process.env.JWT_SECRET)
    
         req.user = decoded
        next()
        } catch(err) {
           return res.status(401).json({
                message:"invalid token"
            })
        }
 
        
}


module.exports = identifyUser