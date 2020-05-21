const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')

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

module.exports = router