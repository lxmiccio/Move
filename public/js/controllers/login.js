// Flawless

angular.module('myControllers').controller('LoginController', function($window, logService, userService) {

  var vm  = this;

  vm.login = function(username, password) {
    userService.login({
      username: username,
      password: password
    }, function(response) {

      logService.create({}, function(response) {
        $window.location.href = '';
      }, function(response) {
        console.log(response);
      })

    }, function(response) {
      console.log(response);
    });
  };

});
