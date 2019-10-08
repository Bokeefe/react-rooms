var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var connectedUsers = {};
var rooms = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', function(client) {
  client.on('subscribeToRooms', () => {
    setInterval(() => {
      client.emit('rooms', rooms);
    }, 500);
  });

  client.on('joinRoom', function(req, callback) {
    if (req.room.replace(/\s/g, '').length > 0 && req.username.replace(/\s/g, '').length > 0) {
      var nameTaken = false;

      Object.keys(connectedUsers).forEach(function(socketId) {
        var userInfo = connectedUsers[socketId];
        if (userInfo.username.toUpperCase() === req.username.toUpperCase()) {
          nameTaken = true;
        }
      });

      if (nameTaken) {
        callback({
          nameAvailable: false,
          error: 'Sorry this username is taken!'
        });
      } else {
        connectedUsers[client.id] = req;
        client.join(req.room);
        rooms.push({ key: req.room, roomName: req.room });

        client.broadcast.to(req.room).emit('message', {
          username: 'System',
          text: req.username + ' has joined!',
          timestamp: moment().valueOf()
        });
        callback({
          nameAvailable: true
        });
      }
    } else {
      callback({
        nameAvailable: false,
        error: 'Hey, please fill out the form!'
      });
    }

    client.on('disconnect', function() {
      var userData = connectedUsers[client.id];
      if (typeof userData !== 'undefined') {
        client.leave(connectedUsers[client.id]);
        io.to(userData.room).emit('message', {
          username: 'System',
          text: userData.username + ' has left!',
          timestamp: moment().valueOf()
        });
        delete connectedUsers[client.id];
      }
    });
  });

  client.on('message', function(message) {
    message.timestamp = moment().valueOf();
    io.to(connectedUsers[client.id].room).emit('message', message);
  });

  client.emit('message', {
    username: 'System',
    text: 'Hey there! Ask someone to join this chat room to start talking.',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
