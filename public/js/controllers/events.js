angular.module("myControllers").controller("EventsController", function ($location, $routeParams, categoryService, paginationService, partecipantService, userService) {

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
    }, function(response) {
      console.log(response);
    });

  }, function(response)  {
    console.log(response);
  });

  vm.redirectToPage = function(page) {
    if(page > 0 && page <= vm.pagination.totalPages) {
      $location.path('categoria/' + $routeParams.id + '/pagina/' + page)
    }
  };

  vm.redirect = function(path) {
    $location.path(path);
  };

  vm.addPartecipant = function(name, event, pr) {

    partecipantService.create({
      name: name,
      event_id: event,
      pr_id: pr.description.id
    }, function(response) {

      categoryService.getById($routeParams.id, function(response) {

        vm.category = response.data.data;

        paginationService.refreshAllCategories(function(response) {
          paginationService.paginate(1);

          vm.pagination = paginationService.getPagination(vm.category.id, $routeParams.page);
        }, function(response) {
          console.log(response);
        });

      }, function(response)  {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });

  };

});
