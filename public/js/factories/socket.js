angular.module('myServices').factory('socket', function (socketFactory) {
  var ioSocket = io.connect('http://localhost:8080');

  socket = socketFactory({
    ioSocket: ioSocket
  });

  return socket;
});
