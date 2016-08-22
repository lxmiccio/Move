var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ioredis = require('ioredis');
var redis = new ioredis();

var port = 8080;

http.listen(port, function() {
  console.log('Listening on *:' + port);
});

io.on('connection', function (socket) {

  console.info('Client connected');

  // Subscribe users to a specific channel, so that they can receive messages directly from our Controllers
  redis.subscribe('counter.increase');
  redis.subscribe('counter.update');

  // Get messages send by Controllers
  redis.on('message', function (channel, message) {
    console.log('Received message ' + message + ' in channel ' + channel);

    socket.emit(channel, message);
  });

  socket.on('disconnect', function() {
    console.info('Client disconnected');
  });

});
