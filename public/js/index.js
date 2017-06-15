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

  var li = jQuery('<li></li>');
  li.text(`${data.from}:${data.text}`);
  jQuery('#messageList').append(li);

});

socket.on('newUserJoined',function(data){

  console.log(data);
});

// socket.emit('createMessage',{
//
//   from:'Randy',
//   text:'RKO'
// },function(responseFromServer){
//
//     console.log('Got ack.', responseFromServer);
// });

jQuery('#messageForm').on('submit',function(e){

  e.preventDefault();

  socket.emit('createMessage',{

    from:'User',
    text : jQuery('[name=message]').val()
  },function(ack){


  });
});
