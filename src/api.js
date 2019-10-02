import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

function subscribeToRooms(cb) {
    socket.on('rooms', rooms => cb(rooms));
    socket.emit('subscribeToRooms', 1000);
  }

function joinRoom(data, cb) {
  socket.on('joinedRoom', room => cb(room));
  socket.emit('joinRoom',  { room: data.room, username: data.username }, cb);
}

function message(cb) {
  socket.on('message', message => cb(message))
}

export { joinRoom, message, subscribeToRooms }