const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User=mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
  User.findOne({_id:req.params.id})
  .select("-password")
  .then(user=>{
    Post.find({postedBy:req.params.id})
    .populate("postedBy","_id name")
    .exec((err,post)=>{
      if(err)
      {
        return res.status(422).json({error:err})
      }
      res.json({user,post})
    })
  })
  .catch(error=>{
    return res.status(422).json({error:"User not found"})
  })
})

router.put('/follow',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
  },{new:true},(err,result)=>{
    if(err)
    {
      return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id,{
      $push:{following:req.body.followId}
    },{
      new:true
    })
    .select("-password")
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{
      return res.status(422).json({error:err})
    })

  })
})
router.put('/unfollow',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.body.unfollowId,{
    $pull:{followers:req.user._id}
  },{new:true},(err,result)=>{
    if(err)
    {
      return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.body.unfollowId}
    },{
      new:true
    })
    .select("-password")
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{
      return res.status(422).json({error:err})
    })

  })
})

router.put('/updatephoto',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{$set:{photo:req.body.photo}},{new:true},
    (err,result)=>{
      if(err)
      {
        return res.status(422).json({error:"Photo cannot be uploaded"})
      }
      res.json(result)
    })
})
router.put('/updatecover',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{$set:{cover:req.body.cover}},{new:true},
    (err,result)=>{
      if(err)
      {
        return res.status(422).json({error:"Cover cannot be updated"})
      }
      res.json(result)
    })
})

router.get(`/connections/:userid`,requireLogin,(req,res)=>{
    User.find({_id:req.params.userid})
    .then(user=>{
      User.find({_id:{$in:[...user[0].following,...user[0].followers]}})
      .select("_id name avatar followers following")
      .then(connection=>{
        res.status(200).json(connection)
      })
      .catch(error=>{
        console.log(error)
      })
    })
    .catch(error=>{
      console.log(error)
    })

})
router.post('/searchUser',requireLogin,(req,res)=>{
  let userPattern=new RegExp("^"+req.body.query)
  User.find({email:{$regex:userPattern}})
  .select("_id email name photo")
  .then(user=>{
    res.json({user:user})
  })
  .catch(error=>{
    console.log(error)
  })
})
module.exports = router