
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

  socket.emit('newMessage',{

      from: 'Paddy',
      text: 'Hey, when do you want to meet',
      createdAt: +new Date()
  });

  socket.on('createMessage',function(message){

      console.log('New Message received: ',message);
  })
  socket.emit('newEmail',{

    from:'paddy@gmail.com',
    text:'Wassup nigga.',
    createdAt: 123
  });

  socket.on('createEmail',(newEmail)=>{

    console.log('Got a mail: ',newEmail);

  })

});



server.listen(port,()=>{

  console.log(`Server up on ${port}`);
})
