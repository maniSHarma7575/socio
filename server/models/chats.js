const mongoose =require('mongoose')
const {ObjectId} =mongoose.Schema.Types

const chatSchema=new mongoose.Schema({
  receiver:{
    type: ObjectId,
    ref: "User"
  },
  message:[{
    body:String,
    attachments:String,
    createdAt    : { type: Date, required: true, default: Date.now }
  }],
  user:{
    type:ObjectId,
    ref:"User"
  }
},{timestamps:true})

mongoose.model('Chat',chatSchema)