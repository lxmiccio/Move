angular.module('myControllers').controller('ImageController', function (imageService) {

  var vm  = this;

  imageService.getAll(function(response) {
    vm.images = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.remove = function(image) {
    imageService.cancel({
      image: image.image
    }, function(response) {

      imageService.remove(image.id, function(response) {

        imageService.getAll(function(response) {
          vm.images = response.data.data;
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

});
