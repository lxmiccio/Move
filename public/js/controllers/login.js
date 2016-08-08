angular.module("myControllers").controller("LoginController", function ($location, $rootScope, userService) {

  var vm  = this;

  vm.login = function(username, password) {
    userService.login({
      username: username,
      password: password
    }, function(response) {
      $location.path($rootScope.previous);
    }, function(response) {
      console.log(response);
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
