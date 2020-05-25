const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')

router.get('/', (req, res) => {
    res.send('hello')
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
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
                        password: hashPassword
                    })
                    user.save()
                        .then(user => {
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
                        const {_id,name,email,followers,following}=user
                        res.json({ token,user:{_id,name,email,followers,following}})
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