const mongoose = require("mongoose")

function connetToDb () {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connect to db")
    })
}


module.exports = connetToDb