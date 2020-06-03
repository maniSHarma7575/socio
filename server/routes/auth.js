const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const {USER_EMAIL,USER_PASS,RESET_DOMAIN} =require('../config/keys')
const sendgridTransport=require('nodemailer-sendgrid-transport')

/*const transport=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
*/

const transport=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER_EMAIL,
      pass: USER_PASS
    }
  })


//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

router.get('/',(req,res)=>{
    res.json({
        message:"Hello"
    })
})

router.post('/signup', (req, res) => {
    const { name, email, password,oauthProvider } = req.body
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
                        oauthProvider:oauthProvider
                    })
                    user.save()
                        .then(user => {
                            transport.sendMail({
                                to:user.email,
                                from:USER_EMAIL,
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
    const { email, password } = req.body
    console.log(email,password)
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
                        const {_id,name,email,followers,following,avatar,cover,profileProgress,quote,previousJob,currentJob,
                            currentCity,originCity,designation
                        }=user
                        res.json({ token,user:{_id,name,email,followers,following,avatar,cover,profileProgress,quote,previousJob,currentJob,
                            currentCity,originCity,designation}})
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

router.post('/resetLink',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log(err)
        }
        const token=buffer.toString('hex')
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user)
            {
                return res.status(422).json({error:"User  dosen't exists with this email"})
            }
            user.resetToken=token
            user.expireToken=Date.now()+3600000
            user.save()
            .then((result)=>{
                transport.sendMail({
                    to:user.email,
                    from:USER_EMAIL,
                    subject:"Password Reset link added",
                    html:`
                    <p>You request for reset password link</p>
                    <h5>Click in this <a href="${RESET_DOMAIN}/reset/${token}">Link</a></h5>
                    `
                })
                .catch(error=>{
                    console.log(error)
                })
                res.json({message:"Check your email"})
            })
            .catch(error=>{
                console.log(error)
            })

        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/updatePassword',(req,res)=>{
    const newPassword=req.body.password
    const sentToken=req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({
                error:"Try again link expired"
            })
        }
        bcrypt.hash(newPassword,12)
        .then(hashPassword=>{
            user.password=hashPassword,
            user.resetToken=undefined,
            user.expireToken=undefined,
            user.save()
            .then(savedUser=>{
                res.json({
                    message:"Password Updated Successfully"
                })
            })
        })
        .catch(error=>{
            console.log(error)
        })
    })
})

module.exports = router