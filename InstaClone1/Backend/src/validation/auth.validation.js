const {body, validationResult} =  require('express-validator');

const validate = (req,res,next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) { // this means if there are error in validation
        return  res.status(400).json({
            errors:errors.array()
        })

    }
   next()
}

 const registerValidation = [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").trim().isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    validate
] 


module.exports = {
    registerValidation
}

