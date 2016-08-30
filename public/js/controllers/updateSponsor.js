// Flawless

angular.module('myControllers').controller('UpdateSponsorController', function ($routeParams, $window, imageService, sponsorService) {

  var vm  = this;

  vm.changedImage = false;

  sponsorService.getById($routeParams.id, function(response) {
    vm.sponsor = response.data.data;

    vm.name = vm.sponsor.name;
    vm.link = vm.sponsor.link;
    vm.description = vm.sponsor.description;
    vm.image = vm.sponsor.image;
  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function() {
    vm.image = null;
    vm.changedImage = true;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
    vm.changedImage = false;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
      vm.changedImage = true;
    }
  };

  vm.update = function(name, link, description, image, sponsor) {
    if(!vm.changedImage) {
      console.log(name)
      sponsorService.update(sponsor.id, {
        'name': name,
        'link': link,
        'description': description
      }, function(response) {
        $window.location.href = 'amministrazione/sponsor';
      }, function(response) {
        console.log(response);
      });
    }
    else {
      imageService.remove({
        image: sponsor.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'sponsors',
          'filename': sponsor.id
        }, function(response) {

          sponsorService.update(sponsor.id, {
            'name': name,
            'link': link,
            'description': description,
            'image': response.data.image
          }, function(response) {
            $window.location.href = 'amministrazione/sponsor';
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
