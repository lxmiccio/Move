angular.module("myControllers").controller("ResetPasswordController", function ($routeParams, userService) {

  var vm  = this;

  vm.resetPassword = function(username, password, passwordConfirmation) {
    userService.resetPassword({
      token: $routeParams.token,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation
    }, function(response) {
      console.log(response);
    }, function(response) {
      console.log(response);
    });
  };

});
