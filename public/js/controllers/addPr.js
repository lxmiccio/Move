angular.module("myControllers").controller("AddPrController", function ($location, $routeParams, categoryService, prService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.prs = [];

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    prService.getAll(function(response) {
      var prs = response.data.data;

      angular.forEach(prs, function(pr) {
        var found = false;

        angular.forEach(vm.category.prs, function(categoryPr) {
          if(categoryPr.id == pr.id) {
            found = true;
          }
        });

        if(!found) {
          vm.prs.push(pr);
        }
      });
      console.log(vm.prs)
    }, function(response) {
      console.log(response);
    });
  }, function(response) {
    console.log(response);
  });

  vm.createPr = function (firstName, lastName, category) {
    prService.create({
      first_name: firstName,
      last_name: lastName
    }, function(response) {

      categoryService.attachPr(category.id, {
        pr_id: response.data.data.id
      }, function(response) {
        console.log(response);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
