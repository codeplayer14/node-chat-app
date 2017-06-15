
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT||3000;
const express = require('express');
const publicPath = path.join(__dirname,'../public');

var {generateMessage}  = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{



    socket.emit('newMessage',generateMessage('Admin',"Welcome to Paddy's ChatApp."));
    socket.broadcast.emit('newMessage',generateMessage('Admin',"New user joined."));


  console.log(`New user connected.`);

  socket.on('disconnect',(socket)=>{

      console.log('Disconnected.');

    });


  socket.on('createMessage',function(message,callback){


   io.emit('newMessage',generateMessage(message.from,message.text));

   callback('This is from server');
  });
  // socket.broadcast.emit('newMessage',{
  //   from:message.from,
  //   text:message.text,
  //   createdAt: new Date().getTime()
  // });


 });



server.listen(port,()=>{

  console.log(`Server up on ${port}`);
})


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
