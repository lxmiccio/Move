angular.module('myServices').factory('socket', function (socketFactory) {
  // Uncomment for server
  var ioSocket = io.connect('http://moveperugia.com');

  // Uncomment for localhost
  // var ioSocket = io.connect('http://localhost:3000');

  socket = socketFactory({
    ioSocket: ioSocket
  });

  return socket;
});
