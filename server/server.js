
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT||3000;
const express = require('express');
const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{

  console.log(`New user connected.`);

  socket.on('disconnect',(socket)=>{

      console.log('Disconnected.');

    });


  socket.on('createMessage',function(message){

      console.log('New Message received: ',message);

   io.emit('newMessage',{
     from:message.from,
     text:message.text,
     createdAt: new Date().getTime()
   });
  });
//   socket.emit('newEmail',{
//
//     from:'paddy@gmail.com',
//     text:'Wassup nigga.',
//     createdAt: 123
//   });
//
//   socket.on('createEmail',(newEmail)=>{
//
//     console.log('Got a mail: ',newEmail);
//
//   })
//
 });



server.listen(port,()=>{

  console.log(`Server up on ${port}`);
})
