angular.module("myControllers").controller("UpdateDjController", function ($filter, $location, $routeParams, djService, imageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  djService.getById($routeParams.id, function(response) {
    vm.dj = response.data.data;

    vm.firstName = vm.dj.firstName;
    vm.lastName = vm.dj.lastName;
    vm.description = vm.dj.description;
    vm.image = vm.dj.image;
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

  vm.updateDj = function(firstName, lastName, description, image, dj) {
    if(image && dj.image && image != dj.image) {
      imageService.remove({
        image: dj.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'djs',
          'filename': dj.id
        }, function(response) {

          djService.update(dj.id, {
            first_name: firstName,
            last_name: lastName,
            description: description,
            image: response.data.image
          }, function(response) {
            $location.path('dj/' + response.data.data.id);
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
    else if(image && dj.image && image == dj.image) {
      djService.update(dj.id, {
        first_name: firstName,
        last_name: lastName,
        description: description,
        image: image
      }, function(response) {
        $location.path('dj/' + response.data.data.id);
      }, function(response) {
        console.log(response);
      });
    }
    else if(image && !dj.image) {
      imageService.upload({
        'image': image,
        'directory': 'djs',
        'filename': dj.id
      }, function(response) {

        djService.update(dj.id, {
          first_name: firstName,
          last_name: lastName,
          description: description,
          image: response.data.image
        }, function(response) {
          $location.path('dj/' + response.data.data.id);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(!image && dj.image) {
      imageService.remove({
        image: dj.image
      }, function(response) {

        djService.update(dj.id, {
          first_name: firstName,
          last_name: lastName,
          description: description,
          image: image
        }, function(response) {
          $location.path('dj/' + response.data.data.id);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(!image && !dj.image) {
      djService.update(dj.id, {
        first_name: firstName,
        last_name: lastName,
        description: description,
        image: image
      }, function(response) {
        $location.path('dj/' + response.data.data.id);
      }, function(response) {
        console.log(response);
      });
    }
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
