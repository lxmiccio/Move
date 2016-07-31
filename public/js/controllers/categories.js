angular.module("myControllers").controller("CategoriesController", function ($http, $location, categoryService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getAll(function(response) {
    vm.categories = [];

    angular.forEach(response.data.data, function(category) {
      vm.categories.push(category);
    });
  }, function(response)  {
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
