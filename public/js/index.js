var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // Emit an event to a single connection
  socket.emit('createMessage', {
    from: 'client',
    text: 'Hey. This is the client.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
