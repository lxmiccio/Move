angular.module("myControllers").controller("LoginController", function ($location, userService) {

  var vm  = this;

  vm.login = function(username, password) {
    userService.login({
      username: username,
      password: password
    }, function(response) {
      $location.path('/');
    }, function(response) {
      console.log(response);
    });
  };

});
