angular.module("myControllers").controller("IndexController", function ($http, $window, localStorageService, counterService, userService) {

  var vm  = this;

  counterService.increase(1, {
  }, function(response) {
    vm.counter = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.logout = function() {
    userService.logout(function(response) {
      $window.location.reload();
    }, function(response) {
      console.log(response);
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
