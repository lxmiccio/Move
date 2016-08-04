angular.module("myControllers").controller("UpdateCategoryController", function ($location, $rootScope, $routeParams, categoryService, imageService, userService) {

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

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.updateCategory = function(name, description, image, category) {

    if(image && category.image && image != category.image) {

      imageService.remove({
        path: category.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'categories',
          'filename': category.id
        }, function(response) {

          categoryService.update(category.id, {
            name: name,
            description: description,
            image: response.data.path
          }, function(response) {
            $location.path($rootScope.previous);
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(image && category.image && image == category.image) {

      categoryService.update(category.id, {
        name: name,
        description: description,
        image: image
      }, function(response) {
        $location.path($rootScope.previous);
      }, function(response) {
        console.log(response);
      });

    } else if(image && !category.image) {

      imageService.upload({
        'image': image,
        'directory': 'categories',
        'filename': category.id
      }, function(response) {

        categoryService.update(category.id, {
          name: name,
          description: description,
          image: response.data.path
        }, function(response) {
          $location.path($rootScope.previous);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(!image && category.image) {

      imageService.remove({
        path: category.image
      }, function(response) {

        categoryService.update(category.id, {
          name: name,
          description: description,
          image: image
        }, function(response) {
          $location.path($rootScope.previous);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    } else if(!image && !category.image) {

      categoryService.update(category.id, {
        name: name,
        description: description,
        image: image
      }, function(response) {
        $location.path($rootScope.previous);
      }, function(response) {
        console.log(response);
      });

    }

  };

});
