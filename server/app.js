const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const { MONGO_URI } = require('./keys')

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('Connected success')
})
mongoose.connection.on('error', (err) => {
    console.log(err)
})
app.get('/', (req, res) => {
    res.status(201).json({
        Message: 'hello world'
    })
})
app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})