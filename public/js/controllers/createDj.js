angular.module("myControllers").controller("CreateDjController", function ($location, djService, imageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.createDj = function (firstName, lastName, description, image) {
    if(image) {
      djService.create({
        'first_name': firstName,
        'last_name': lastName,
        'description': description
      }, function(response) {

        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'djs',
          'filename': id
        }, function(response) {

          djService.update(id, {
            'first_name': firstName,
            'last_name': lastName,
            'description': description,
            'image': response.data.image
          }, function(response) {
            $location.path('dj/' + id);
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
    else {
      djService.create({
        'first_name': firstName,
        'last_name': lastName,
        'description': description
      }, function(response) {
        $location.path('dj/' + id);
      }, function(response) {
        console.log(response);
      });
    }
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
