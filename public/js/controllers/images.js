angular.module('myControllers').controller('ImageController', function($uibModal, imageService) {

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

  vm.openImage = function(image, size, view) {
    var modalInstance = $uibModal.open({
      animation: true,
      controller: function ($scope, $uibModalInstance) {
        $scope.image = image;

        $scope.cancel = function () {
          $uibModalInstance.dismiss("cancel");
        };
      },
      resolve: {
        image: function() {
          return image;
        }
      },
      size: size,
      templateUrl: view
    });
  };
});
