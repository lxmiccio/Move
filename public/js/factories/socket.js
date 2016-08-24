angular.module('myServices').factory('socket', function (socketFactory) {
  var ioSocket = io.connect('http://moveperugia.com');

  socket = socketFactory({
    ioSocket: ioSocket
  });

  return socket;
});
