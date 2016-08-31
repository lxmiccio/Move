//Flawless

angular.module('myControllers').controller('AdministerSponsorController', function(imageService, sponsorService) {

  var vm = this;

  sponsorService.getAll(function(response) {
    vm.sponsors = response.data.data;
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

  vm.create = function(name, link, description, image) {
    if(image) {
      sponsorService.create({
        'name': name,
        'link': link,
        'description': description
      }, function(response) {

        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'sponsors',
          'filename': id
        }, function(response) {

          sponsorService.update(id, {
            'name': name,
            'link': link,
            'description': description,
            'image': response.data.image
          }, function(response) {

            vm.name = null;
            vm.link = null;
            vm.description = null;
            vm.image = null;

            sponsorService.getAll(function(response) {
              vm.sponsors = response.data.data;
            }, function(response) {
              console.log(response);
            });

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
      sponsorService.create({
        'name': name,
        'link': link,
        'description': description
      }, function(response) {

        sponsorService.getAll(function(response) {
          vm.sponsors = response.data.data;
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

});
