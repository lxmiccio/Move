// Flawless

angular.module('myControllers').controller('UpdatePrController', function($routeParams, $window, prService) {

  var vm  = this;

  prService.getById($routeParams.id, function(response) {
    vm.pr = response.data.data;

    vm.firstName = vm.pr.firstName;
    vm.lastName = vm.pr.lastName;
  }, function(response) {
    console.log(response);
  });

  vm.update = function(firstName, lastName, pr) {
    prService.update(pr.id, {
      'first_name': firstName,
      'last_name': lastName
    }, function(response) {
      $window.location.href = 'amministrazione/pr';
    }, function(response) {
      console.log(response);
    });
  };

});
