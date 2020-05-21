const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate('postedBy', "_id name")
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

    const { title, body } = req.body

    if (!title || !body) {
        return res.status(422).json({
            error: "Please add all the fields"
        })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
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

module.exports = router