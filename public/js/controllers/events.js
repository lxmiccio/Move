angular.module("myControllers").controller("EventsController", function ($location, $routeParams, categoryService, paginationService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {

    vm.category = response.data.data;

    paginationService.getAllCategories(function(response) {
      paginationService.paginate(1);

      vm.pagination = paginationService.getPagination(vm.category.id, $routeParams.page);
      console.log(vm.pagination);
    }, function(response) {
      console.log(response);
    });

  }, function(response)  {
    console.log(response);
  });

});
