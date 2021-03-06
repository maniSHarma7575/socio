const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
//const PORT = 5000
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config/keys')
require('./models/user')
require('./models/posts')
require('./models/chats')
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
app.use(require('./routes/user'))
app.use('/chat',require('./routes/chat'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const server=app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})

const io=(module.exports.io=require('socket.io')(server))
const SocketManager=require('./socketManager')
io.on('connection',SocketManager)

