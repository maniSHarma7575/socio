const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Chat = mongoose.model("Chat")
const User=mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')

router.get('/threads',requireLogin,(req,res)=>{
  Chat.find({user:req.user._id})
  .populate('participantIds','_id name avatar')
  .then((result)=>{
    res.json({result})
  })
  .catch((error)=>{
    console.log(error)
  })
})

router.get('/contacts',requireLogin,(req,res)=>{
  User.find()
  .select("_id name avatar")
  .then((result)=>{
    res.json({result})
  })
  .catch((error)=>{
    console.log(error)
  })
})
module.exports=router