const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate('postedBy', "_id name")
        .populate('comments.postedBy',"_id name")
        .then(result => {
            res.json({
                result
            })
        })
        .catch(error => {
            console.log('error')
        })
})
router.get('/mysubpost', requireLogin, (req, res) => {
    Post.find({postedBy:{$in:req.user.following}})
        .populate('postedBy', "_id name")
        .populate('comments.postedBy',"_id name")
        .then(result => {
            res.json({
                result
            })
        })
        .catch(error => {
            console.log('error')
        })
})
router.post('/createpost', requireLogin, (req, res) => {

    const { title, body,image } = req.body

    if (!title || !body ||!image) {
        return res.status(422).json({
            error: "Please add all the fields"
        })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:image,
        postedBy: req.user
    })
    post.save().then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(error)
        })

})

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate('postedBy', "_id name")
        .then(data => {
            res.json({
                data
            })
        })
        .catch(error => {
            console.log(error)
        })

})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        res.json({result})
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        res.json({result})
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user
    }
    console.log(req.body.postedBy)
    Post.findByIdAndUpdate(req.body.postedBy,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        
        res.json(result)
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post)
        {
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

module.exports = router