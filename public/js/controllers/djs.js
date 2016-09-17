//Flawless

angular.module('myControllers').controller('DjsController', function(djService) {

  var vm  = this;

  djService.getAll(function(response) {
    vm.djs = response.data.data;

    vm.mdDjPagination = [];
    vm.smDjPagination = [];

    angular.forEach(vm.djs, function(dj, index) {
      if(!index || !(index % 2)) {
        vm.smDjPagination.push([dj]);
      } else {
        vm.smDjPagination[vm.smDjPagination.length - 1].push(dj);
      }
      if(!index || !(index % 3)) {
        vm.mdDjPagination.push([dj]);
      } else {
        vm.mdDjPagination[vm.mdDjPagination.length - 1].push(dj);
      }
    });
  }, function(response)  {
    console.log(response);
  });

});
