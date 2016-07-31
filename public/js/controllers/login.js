angular.module("myControllers").controller("LoginController", function ($location, userService) {

  var vm  = this;

  vm.login = function(email, password) {
    userService.login({
      email: email,
      password: password
    }, function(response) {
      $location.path('/');
    }, function(response) {
      console.log(response);
    });
  };

});
