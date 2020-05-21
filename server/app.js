const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const { MONGO_URI } = require('./keys')
require('./models/user')
require('./models/posts')
const requireLogin = require('./middleware/requireLogin')




mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('Connected success')
})
mongoose.connection.on('error', (err) => {
    console.log(err)
})
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})