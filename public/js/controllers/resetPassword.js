angular.module("myControllers").controller("ResetPasswordController", function ($location, $routeParams, userService) {

  var vm  = this;

  vm.resetPassword = function(username, password, passwordConfirmation) {
    userService.resetPassword({
      token: $routeParams.token,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation
    }, function(response) {
      $location.path('login');
    }, function(response) {
      console.log(response);
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
