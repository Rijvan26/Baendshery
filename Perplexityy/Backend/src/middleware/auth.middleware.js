import jwt from "jsonwebtoken"

const authUser = (req,res, next) => {
    const token =  req.cookies.token


    console.log("Authorization:", req.headers.authorization);
console.log("Headers:", req.headers); 
    if(!token){
        return res.status(400).json({
            success:false,
            message:"token is required"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }
}

export default authUser