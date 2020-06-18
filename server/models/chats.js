const mongoose =require('mongoose')
const {ObjectId} =mongoose.Schema.Types

const chatSchema=new mongoose.Schema({
  participantIds:[
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  messages:[{
    body:String,
    attachments:String,
    senderId:{
      type:ObjectId,
      ref:"User"
    },
    contentType:String,
    createdAt    : { type: Date, required: true, default: Date.now }
  }],
  unreadCount:{
    type:Number,
    default:0
  }
},{timestamps:true})

mongoose.model('Chat',chatSchema)