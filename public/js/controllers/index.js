angular.module("myControllers").controller("IndexController", function ($http, $window, localStorageService, counterService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  counterService.increase(1, function(response) {
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

  vm.increaseCounter = function(visitors) {
    counterService.update(1, {
      visitors: visitors
    },function(response) {
      vm.counter = response.data.data;
    }, function(response) {
      console.log(response)
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
