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

  var li = $('<li></li>');
  li.text(`${data.from}:${data.text}`);
  $('#messageList').append(li);

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

$('#messageForm').on('submit',function(e){

  e.preventDefault();

  socket.emit('createMessage',{

    from:'User',
    text : $('[name=message]').val()
  },function(ack){


  });
});

var locationButton = $('#locationButton');

locationButton.on('click',function(e){

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);

    socket.emit('PositionDetails',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });

  },function(){
    console.log('Error in fetching position.');
  });

});


socket.on('newLocationMessage',function(locationData){

  var li = $('<li></li>');
  var a = $(`<a target = _blank>Location</a>`)

  a.attr('href',locationData.locationURL);
  li.text(locationData.from+": ");
  li.append(a);
  $('#messageList').append(li);

});
