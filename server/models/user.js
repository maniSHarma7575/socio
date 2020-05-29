const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    oauthProvider:{
        type: String,
        default:undefined
    },
    resetToken:String,
    expireToken:Date,
    photo:{
        type:String,
        default:"https://res.cloudinary.com/socio/image/upload/v1590489444/nophoto_zuge3f.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User", userSchema)