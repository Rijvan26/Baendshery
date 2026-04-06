require("dotenv").config()
const mongoose = require("mongoose")

async function connectToDb () {
  await  mongoose.connect(process.env.MONGO_URL)
     console.log("coonnect to db")
}

module.exports = connectToDb