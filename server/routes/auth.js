const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello')
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        res.status(422).json({
            error: "Required all fields"
        })
    } else {
        res.status(201).json({
            message: "Successfully Posted"
        })
    }
})

module.exports = router