const io=require('./app').io
const User=require('./models/user')
const Chats=require('./models/chats')

var onlineUsers=[]
module.exports=socket=>{
  socket.on('connectUser',(user,callback)=>{
    onlineUsers.push({
      userId:user._id,
      profileId:socket.id,
      userName:user.name
    })
    console.log(onlineUsers)
    io.sockets.emit('connectedUsers',onlineUsers)
  })
  socket.on('disconnect',()=>{
    var i=0;
    while(i<onlineUsers.length)
    {
      if(onlineUsers[i].profileId==socket.id){
        break
      }
      i++
    }
    console.log(socket.id+'disconnected')
    onlineUsers.splice(i,1)
    io.sockets.emit('connectedUsers',onlineUsers)

  })
  socket.on('chatting',(message,sender,receiver)=>{
    socket.to(receiver.emit('reciverPeer',message,socket.id,receiver))
    socket.emit('senderPeer',message,socket.id,receiver)
  })
}