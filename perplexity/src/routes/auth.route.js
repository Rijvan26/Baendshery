import { Router } from "express"; 
import { validateUserSignup ,validateUserLogin} from "../validation/user.validation.js";
import { validate } from "../middleware/validate.js";
import { registerUser ,verifyEmail, LoginUser,getme} from "../controllers/auth.controller.js";
import validateToken from "../middleware/auth.middleware.js"

const authRouter =  Router()

authRouter.post("/register", validateUserSignup, validate,registerUser)

authRouter.get("/verify-email",verifyEmail)

authRouter.post("/login", validateUserLogin, validate, LoginUser )

authRouter.get('/getme', validateToken, getme)

export default authRouter