angular.module('myServices').factory('socket', function (socketFactory) {
  // var ioSocket = io.connect('http://localhost:3000');
  var ioSocket = io.connect('http://moveperugia.com');

  socket = socketFactory({
    ioSocket: ioSocket
  });

  return socket;
});
