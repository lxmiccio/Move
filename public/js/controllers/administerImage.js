// Flawless

angular.module('myControllers').controller('AdministerImageController', function($location, imageService) {

  var vm  = this;

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.changeImage = function(image) {
    
  };

  imageService.getAll(function(response) {
    vm.djs = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.create = function(image) {
    if(image) {
      imageService.create({
      }, function(response) {

        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'images',
          'filename': id
        }, function(response) {

          imageService.update(id, {
            'image': response.data.image
          }, function(response) {
            $location.path('foto');
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

});
