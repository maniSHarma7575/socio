const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    message: {
        type: String,
       
    },
    media: {
        type: String,
        
    },
    createdAt    : { type: Date, required: true, default: Date.now },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        message:String,
        author:{type:ObjectId,ref:"User"},
        createdAt    : { type: Date, required: true, default: Date.now }
    }],
    author: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

mongoose.model("Post", postSchema)