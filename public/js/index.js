var socket = io();

  socket.on('connect',function(){
    console.log('Connected to server.');
  });

  socket.on('disconnect',function(){

    console.log('Disconnected from server');

  });


  // socket.on('newEmail',function(data){
  //
  //   console.log('New Email.',data);
  //
  // });

// socket.emit('createEmail',{
//
//     from: 'Paddy',
//     text: 'Did it work?'
// });

socket.on('newMessage',function(data){

  console.log('New message: ',data);

});

socket.on('newUserJoined',function(data){

  console.log(data);
});
