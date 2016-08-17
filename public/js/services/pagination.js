angular.module('myServices').factory('paginationService', function ($filter, $http) {

  var paginateNewEvents = true;

  function getPaginateNewEvents() {
    return paginateNewEvents;
  }

  function setPaginateNewEvents(boolean) {
    paginateNewEvents = boolean;
  };

  var events = [];

  function paginate(category, objectsPerPage) {
    events.length = 0;

    if(paginateNewEvents) {
      angular.forEach($filter('newEvents')(category.events), function(event, index) {
        if(index == 0 || index % objectsPerPage == 0) {
          events.push([event]);
        } else {
          events[events.length - 1].push(event);
        }
      });
    } else {
      angular.forEach($filter('oldEvents')(category.events), function(event, index) {
        if(index == 0 || index % objectsPerPage == 0) {
          events.push([event]);
        } else {
          events[events.length - 1].push(event);
        }
      });
    }
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
    getPaginateNewEvents: getPaginateNewEvents,
    setPaginateNewEvents: setPaginateNewEvents,
    paginate: paginate,
    getPagination: getPagination
  };

});
