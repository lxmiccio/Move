angular.module("myControllers").controller("RecoverPasswordController", function (userService) {

  var vm  = this;

  vm.recoverPassword = function(username) {
    userService.recoverPassword({
      username: username
    }, function(response) {
      console.log(response);
    }, function(response) {
      console.log(response);
    });
  };

});
