// Flawless

angular.module('myControllers').controller('UpdateCategoryController', function($filter, $routeParams, categoryService, imageService, prService, userService) {

  var vm  = this;

  vm.changedImage = false;

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    vm.name = vm.category.name;
    vm.image = vm.category.image;

    prService.getAll(function(response) {
      vm.prs = response.data.data;

      vm.filteredPrs = vm.prs.shift();
      vm.filteredPrs = $filter('newPrs')(vm.prs, vm.category);
    }, function(response) {
      console.log(response);
    });

  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function() {
    vm.image = null;
    vm.changedImage = true;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
    vm.changedImage = false;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
      vm.changedImage = true;
    }
  };

  vm.update = function(name, image, category) {
    if(!vm.changedImage) {
      categoryService.update(category.id, {
        'name': name,
        'image': image
      }, function(response) {
        vm.category = response.data.data;
      }, function(response) {
        console.log(response);
      });
    }
    else {
      imageService.cancel({
        image: category.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'categories',
          'filename': category.id
        }, function(response) {

          categoryService.update(category.id, {
            'name': name,
            'image': response.data.image
          }, function(response) {
            vm.category = response.data.data;
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

  vm.createPr = function(firstName, lastName, category) {
    prService.create({
      first_name: firstName,
      last_name: lastName
    }, function(response) {

      categoryService.attachPr(category.id, {
        pr_id: response.data.data.id
      }, function(response) {

        vm.category = response.data.data;

        vm.firstName = '';
        vm.lastName = '';

        prService.getAll(function(response) {
          vm.prs = response.data.data;
          vm.filteredPrs = $filter('newPrs')(vm.prs, vm.category);
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

  vm.attachPrs = function(selectedPrs, category) {
    angular.forEach(selectedPrs, function(pr) {
      categoryService.attachPr(category.id, {
        pr_id: pr.id
      }, function(response) {
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.prs, vm.category);
      }, function(response) {
        console.log(response);
      });
    });
  };

  vm.detachPr = function(pr, category) {
    categoryService.detachPr(category.id, {
      pr_id: pr.id
    }, function(response) {

      categoryService.getById(category.id, function(response) {
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.prs, vm.category);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
