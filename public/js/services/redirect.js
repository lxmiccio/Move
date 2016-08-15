angular.module('myServices').factory('redirectService', function ($filter, $http) {

  function getPageToRedirectTo(category, event, objectsPerPage) {
    var events = [];
    var page = 0;

    angular.forEach($filter('newEvents')(category.events), function(entry, index) {
      if(entry.id == event.id) {
        page = events.length;
      }
      if(index == 0 || index % objectsPerPage == 0) {
        events.push([entry]);
      } else {
        events[events.length - 1].push(entry);
      }
    });

    return page + 1;
  };

  return {
    getPageToRedirectTo: getPageToRedirectTo
  };

});
