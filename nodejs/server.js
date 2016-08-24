var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

var port = 3000;

http.listen(port, function() {
  console.log('Listening on *:' + port);
});

io.on('connection', function (socket) {

  console.info('Client connected');

  redis.subscribe('counter.increase');

  redis.on('message', function (channel, message) {
    console.log('Received message ' + message + ' in channel ' + channel);

    socket.emit(channel, message);
  });

  socket.on('disconnect', function() {
    console.info('Client disconnected');
  });

});
