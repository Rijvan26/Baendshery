const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDb() {
    mongoose.connect("mongodb+srv://Rijvaan1:RpSVhuOtsbGk4jwy@cluster0.lpn2uze.mongodb.net/Day06")
    .then( () => {
        console.log("connect to database");
        
    })
}

connectToDb()
app.listen(3000, function () {
    console.log("server is run on port 3000");
    
})