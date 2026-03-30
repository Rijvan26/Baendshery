const mongoose = require("mongoose")

const connecToDb = async () => {
 await   mongoose.connect(process.env.MONGO_URL)
        console.log("connect to db")
    
}

module.exports = connecToDb