const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

const transport=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

//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

router.get('/',(req,res)=>{
    res.json({
        message:"Hello"
    })
})

router.post('/signup', (req, res) => {
    const { name, email, password,photo } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({
            error: "Required all fields"
        })
    }
    User.findOne({ email: email })
        .then((response) => {
            if (response) {
                return res.status(422).json({
                    error: "Account already exists with this email"
                })
            }
            bcrypt.hash(password, 12)
                .then(hashPassword => {
                    const user = new User({
                        name,
                        email,
                        password: hashPassword,
                        photo:photo
                    })
                    user.save()
                        .then(user => {
                            transport.sendMail({
                                to:user.email,
                                from:"sofowal733@ximtyl.com",
                                subject:"Sign up successfull",
                                html:"<h1>Welcome to instagram !Kudos for becoming the memeber of the Socio organisation</h1>"
                            })
                            res.status(201).json({
                                message: "User successfully added"
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })

                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/signin', (req, res) => {
    console.log('oka')
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({
            error: "All fields are required"
        })
    }
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).json({
                    error: "Invalid email or password"
                })
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: user._id }, JWT_SECRET)
                        const {_id,name,email,followers,following,photo}=user
                        res.json({ token,user:{_id,name,email,followers,following,photo}})
                    } else {
                        return res.status(422).json({
                            error: "Invalid email or password"
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
})

module.exports = router