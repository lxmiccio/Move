angular.module('myServices').factory('paginationService', function ($http, categoryService) {

  var events = [];

  function paginate(category, objectsPerPage) {
    events.length = 0;

    angular.forEach(category.events, function(event, index) {
      if(index == 0 || index % objectsPerPage == 0) {
        events.push([event]);
      } else {
        events[events.length - 1].push(event);
      }
    });
  };

  function getPage(category, objectsPerPage, event, onSuccess, onError) {
    categoryService.getById(category, function(response) {
      var array = [];
      var page = 0;

      angular.forEach(response.data.data.events, function(entry, index) {
        if(entry.id == event.id) {
          page = array.length;
        }
        if(index == 0 || index % objectsPerPage == 0) {
          array.push([entry]);
        } else {
          array[array.length - 1].push(entry);
        }
      });

      onSuccess(page + 1);
    }, function(response) {
      onError(response);
    })


  };

  function getPagination(page) {
    var totalPages = events.length;
    var startingPage, endingPage;

    if (totalPages <= 10) {
      startingPage = 1;
      endingPage = totalPages;
    } else {
      if (page <= 6) {
        startingPage = 1;
        endingPage = 10;
      } else if (page + 4 >= totalPages) {
        startingPage = totalPages - 9;
        endingPage = totalPages;
      } else {
        startingPage = page - 5;
        endingPage = page + 4;
      }
    }

    return {
      events: events[page - 1],
      pages: _.range(startingPage, endingPage + 1),
      page: page,
      totalPages: totalPages
    };
  };

  return {
    paginate: paginate,
    getPage: getPage,
    getPagination: getPagination
  };

});
