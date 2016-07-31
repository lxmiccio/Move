angular.module("myControllers").controller("IndexController", function ($http, counterService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  counterService.increase(1, {

  }, function(response) {
    vm.counter = response.data.data;
    console.log(response.data)
  }, function(response) {
    console.log(response);
  });

  vm.logout = function() {
    userService.logout(function(response) {
      console.log(response);
    }, function(response) {
      console.log(response);
    });
  };

  vm.redirect = function(path) {
    $location.redirect(path);
  };

});
