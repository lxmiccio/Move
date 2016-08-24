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
    vm.externalImage = vm.dj.externalImage;
    vm.internalImage = vm.dj.internalImage;
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
      image: dj.externalImage
    }, function(response) {

      imageService.remove({
        image: dj.internalImage
      }, function(response) {

        if(externalImage) {
          imageService.upload({
            'image': externalImage,
            'directory': 'djs/' + dj.id,
            'filename': 1
          }, function(response) {

            if(internalImage) {
              var externalImage = response.data.image;

              imageService.upload({
                'image': internalImage,
                'directory': 'djs/' + dj.id,
                'filename': 2
              }, function(response) {

                djService.update(dj.id, {
                  'first_name': firstName,
                  'last_name': lastName,
                  'description': description,
                  'external_image': externalImage,
                  'internal_image': response.data.image
                }, function(response) {
                  $location.path('dj/' + dj.id);
                }, function(response) {
                  console.log(response);
                });

              }, function(response) {
                console.log(response);
              });
            }
            else {
              djService.update(dj.id, {
                'first_name': firstName,
                'last_name': lastName,
                'description': description,
                'external_image': response.data.image,
                'internal_image': internalImage
              }, function(response) {
                $location.path('dj/' + dj.id);
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
            'directory': 'djs/' + dj.id,
            'filename': 2
          }, function(response) {

            djService.update(dj.id, {
              'first_name': firstName,
              'last_name': lastName,
              'description': description,
              'external_image': externalImage,
              'internal_image': response.data.image
            }, function(response) {
              $location.path('dj/' + dj.id);
            }, function(response) {
              console.log(response);
            });

          }, function(response) {
            console.log(response);
          });
        } else {
          djService.update(dj.id, {
            'first_name': firstName,
            'last_name': lastName,
            'description': description,
            'external_image': externalImage,
            'internal_image': internalImage
          }, function(response) {
            $location.path('dj/' + dj.id);
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
