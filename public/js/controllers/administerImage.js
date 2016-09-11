// Flawless

angular.module('myControllers').controller('AdministerImageController', function($location, imageService) {

  var vm  = this;

  imageService.getAll(function(response) {
    vm.djs = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.create = function(images) {
    if(images && images.length) {
      angular.forEach(images, function(image) {
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
      });
    }
  };
});
