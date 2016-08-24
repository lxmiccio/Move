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

  vm.removeExternalImage = function() {
    vm.externalImage = null;
  };

  vm.restoreExternalImage = function(externalImage) {
    vm.externalImage = externalImage;
  };

  vm.changeExternalImage = function(externalImage) {
    if(externalImage) {
      vm.externalImage = externalImage;
    }
  };

  vm.removeInternalImage = function() {
    vm.internalImage = null;
  };

  vm.restoreInternalImage = function(internalImage) {
    vm.internalImage = internalImage;
  };

  vm.changeInternalImage = function(internalImage) {
    if(internalImage) {
      vm.internalImage = internalImage;
    }
  };

  vm.updateDj = function(firstName, lastName, description, externalImage, internalImage, dj) {
    imageService.remove({
      image: event.externalImage
    }, function(response) {

      imageService.remove({
        image: event.internalImage
      }, function(response) {

        if(externalImage) {
          imageService.upload({
            'image': externalImage,
            'directory': 'djs/' + id,
            'filename': 1
          }, function(response) {

            if(internalImage) {
              var externalImage = response.data.image;

              imageService.upload({
                'image': internalImage,
                'directory': 'djs/' + id,
                'filename': 2
              }, function(response) {

                djService.update(id, {
                  'first_name': firstName,
                  'last_name': lastName,
                  'description': description,
                  'external_image': externalImage,
                  'internal_image': response.data.image
                }, function(response) {
                  $location.path('dj/' + id);
                }, function(response) {
                  console.log(response);
                });

              }, function(response) {
                console.log(response);
              });
            }
            else {
              djService.update(id, {
                'first_name': firstName,
                'last_name': lastName,
                'description': description,
                'external_image': response.data.image,
                'internal_image': internalImage
              }, function(response) {
                $location.path('dj/' + id);
              }, function(response) {
                console.log(response);
              });
            }

          }, function(response) {
            console.log(response);
          });
        } else if(internalImage) {
          imageService.upload({
            'image': internalImage,
            'directory': 'djs/' + id,
            'filename': 2
          }, function(response) {

            djService.update(id, {
              'first_name': firstName,
              'last_name': lastName,
              'description': description,
              'external_image': externalImage,
              'internal_image': response.data.image
            }, function(response) {
              $location.path('dj/' + id);
            }, function(response) {
              console.log(response);
            });

          }, function(response) {
            console.log(response);
          });
        } else {
          djService.update(id, {
            'first_name': firstName,
            'last_name': lastName,
            'description': description,
            'external_image': externalImage,
            'internal_image': internalImage
          }, function(response) {
            $location.path('dj/' + id);
          }, function(response) {
            console.log(response);
          });
        }

      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
