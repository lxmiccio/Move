angular.module('myControllers').controller('DjsController', function(djService) {

  var vm  = this;

  djService.getAll(function(response) {
    vm.djs = response.data.data;
  }, function(response)  {
    console.log(response);
  });

});
