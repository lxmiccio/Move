// Flawless

angular.module('myControllers').controller('UpdateEventController', function($filter, $routeParams, $window, eventService, imageService) {

  var vm  = this;

  vm.changedImage = false;

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;

    vm.name = vm.event.name;
    vm.startingDate = vm.event.startingDate;
    vm.maximumPartecipants = vm.event.maximumPartecipants;
    vm.description = vm.event.description;
    vm.image = vm.event.image;
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    if(startingDate >= new Date()) {
      vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd HH:mm:ss');
    } else {
      vm.startingDate = '';
    }
  };

  vm.onMaximumPartecipantsChange = function(maximumPartecipants, event) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < event.partecipants.length) {
      vm.maximumPartecipants = event.partecipants.length;
    }
  };

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

  vm.update = function(name, startingDate, maximumPartecipants, description, image, event) {
    if(!vm.changedImage) {
      eventService.update(event.id, {
        'name': name,
        'starting_date': startingDate,
        'maximum_partecipants': maximumPartecipants,
        'description': description,
        'image': image
      }, function(response) {
        $window.location.href = 'categoria/' + event.category.id;
      }, function(response) {
        console.log(response);
      });
    }
    else {
      imageService.cancel({
        image: event.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'events',
          'filename': event.id
        }, function(response) {

          eventService.update(event.id, {
            'name': name,
            'starting_date': startingDate,
            'maximum_partecipants': maximumPartecipants,
            'description': description,
            'image': response.data.image
          }, function(response) {
            $window.location.href = 'categoria/' + event.category.id;
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
