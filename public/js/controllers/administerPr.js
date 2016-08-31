//Flawless

angular.module('myControllers').controller('AdministerPrController', function(categoryService, prService) {

  var vm = this;

  categoryService.getAll(function(response) {
    vm.categories = response.data.data;
  }, function(response) {
    console.log(response);
  });

  prService.getAll(function(response) {
    vm.prs = response.data.data;
    vm.prs.shift();

    angular.forEach(vm.prs, function(pr, index) {
      vm.prs[index].writtenCategories = '';
      angular.forEach(pr.categories, function(category) {
        vm.prs[index].writtenCategories += category.name + ', ';
      });
      vm.prs[index].writtenCategories = vm.prs[index].writtenCategories.slice(0, -2);
    });
  }, function(response) {
    console.log(response);
  });

  vm.create = function(firstName, lastName, selectedCategory) {
    prService.create({
      first_name: firstName,
      last_name: lastName
    }, function(response) {

      categoryService.attachPr(selectedCategory[0].id, {
        pr_id: response.data.data.id
      }, function(response) {

        prService.getAll(function(response) {
          vm.prs = response.data.data;
          vm.prs.shift();

          angular.forEach(vm.prs, function(pr, index) {
            vm.prs[index].writtenCategories = '';
            angular.forEach(pr.categories, function(category) {
              vm.prs[index].writtenCategories += category.name + ', ';
            });
            vm.prs[index].writtenCategories = vm.prs[index].writtenCategories.slice(0, -2);
          });
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.remove = function(pr) {
    prService.remove(pr.id, function(response) {

      prService.getAll(function(response) {
        vm.prs = response.data.data;
        vm.prs.shift();

        angular.forEach(vm.prs, function(pr, index) {
          vm.prs[index].writtenCategories = '';
          angular.forEach(pr.categories, function(category) {
            vm.prs[index].writtenCategories += category.name + ', ';
          });
          vm.prs[index].writtenCategories = vm.prs[index].writtenCategories.slice(0, -2);
        });
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
