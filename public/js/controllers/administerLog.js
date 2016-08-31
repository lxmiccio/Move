//Flawless

angular.module('myControllers').controller('AdministerLogController', function ($filter, logService) {

  var vm = this;

  logService.getAll(function(response) {
    vm.logs = response.data.data;

    vm.logs = $filter('orderBy')(vm.logs, 'createdAt', 'desc');
  }, function(response) {
    console.log(response);
  });

});
