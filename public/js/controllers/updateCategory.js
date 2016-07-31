angular.module("myControllers").controller("UpdateCategoryController", function ($location, $routeParams, categoryService, imageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    vm.name = vm.category.name;
    vm.description = vm.category.description;
    vm.image = vm.category.image;
  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function(image) {

    vm.image = null;

  };

  vm.restoreImage = function() {

    vm.image = vm.category.image;

  };

  vm.changeImage = function(image) {

    if(image) {
      vm.image = image;
    }

  };

  vm.updateCategory = function(name, description, image) {

    if(image && vm.category.image && image != vm.category.image) {

      imageService.remove({
        path: vm.category.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'categories',
          'filename': vm.category.id
        }, function(response) {

          categoryService.update(vm.category.id, {
            name: name,
            description: description,
            image: response.data.path
          }, function(response) {
            $location.path('/');
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(image && vm.category.image && image == vm.category.image) {

      categoryService.update(vm.category.id, {
        name: name,
        description: description,
        image: image
      }, function(response) {
        $location.path('/');
      }, function(response) {
        console.log(response);
      });

    } else if(image && !vm.category.image) {

      imageService.upload({
        'image': image,
        'directory': 'categories',
        'filename': vm.category.id
      }, function(response) {

        categoryService.update(vm.category.id, {
          name: name,
          description: description,
          image: response.data.path
        }, function(response) {
          $location.path('/');
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(!image && vm.category.image) {

      imageService.remove({
        path: vm.category.image
      }, function(response) {

        categoryService.update(vm.category.id, {
          name: name,
          description: description,
          image: image
        }, function(response) {
          $location.path('/');
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(!image && !vm.category.image) {

      categoryService.update(vm.category.id, {
        name: name,
        description: description,
        image: image
      }, function(response) {
        $location.path('/');
      }, function(response) {
        console.log(response);
      });

    }
  };

});
