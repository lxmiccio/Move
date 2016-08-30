angular.module('myControllers').controller('DjController', function ($routeParams, djService) {

  var vm  = this;

  djService.getById($routeParams.id, function(response) {
    vm.dj = response.data.data;
  }, function(response)  {
    console.log(response);
  });

});
