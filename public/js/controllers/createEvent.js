//Flawless

angular.module('myControllers').controller('CreateEventController', function($filter, $routeParams, $window, categoryService, eventService, imageService) {

  var vm  = this;

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;
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

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.createEvent = function(name, startingDate, description, image, category) {
    eventService.create({
      'name': name,
      'starting_date': startingDate,
      'description': description,
      'category_id': category.id
    }, function(response) {

      if(!image) {
        $window.location.href = 'categoria/' + category.id;
      }
      else {
        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'events',
          'filename': id
        }, function(response) {

          eventService.update(id, {
            'name': name,
            'starting_date': startingDate,
            'description': description,
            'image': response.data.image
          }, function(response) {
            $window.location.href = 'categoria/' + category.id;
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });
      }

    }, function(response) {
      console.log(response);
    });
  };

});
