const mongoose = require("mongoose")

const blackListSchema = new mongoose.Schema ({
    token:{
        type:String,
        required:[true, "token is required for blacklisting"],
        unique:[true, " unique token is required for blacklisting"],
        
    },

},{
    timestamps:true
})

const blackListModel = mongoose.model("blackList", blackListSchema)

module.exports = blackListModel