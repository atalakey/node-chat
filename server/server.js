/*
  Socket.IO is a library that enables real-time, bidirectional and
  event-based communication between the browser and the server.

  io.emit:
    emit an event to every single connection
  socket.emit:
    emit an event to a single connection
  socket.broadcast.emit:
    emit an event to all connections except for this socket

  socket.join:
    subscribe the socket to a given channel
  socket.leave:
    unsubscribe the socket from a given channel

  use to or in (they are the same) when broadcasting or emitting to specific channel:
  io.to('room name').emit:
    emit an event to every single connection subscribed to a given channel
  socket.broadcast.to('room name).emit:
    emit an event to all connections subscribed to a given channel except for this socket

  Visit https://socket.io/docs to learn more.
*/

const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    console.log('join', params);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));      
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    console.log('createLocationMessage', coords);
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
