angular.module('myServices').factory('paginationService', function ($http, categoryService) {

  var items;

  function getAllCategories(onSuccess, onError) {

    if(items) {
      onSuccess();
    } else {
      categoryService.getAll(function(response) {
        items = [];

        angular.forEach(response.data.data, function(category) {
          items[category.id - 1] = category;
        });
        onSuccess();
      }, function(response) {
        onError(response);
      });
    }

  };

  function refreshAllCategories(onSuccess, onError) {

    categoryService.getAll(function(response) {
      items.length = 0;

      angular.forEach(response.data.data, function(category) {
        items[category.id - 1] = category;
      });

      onSuccess();
    }, function(response) {
      onError(response);
    });

  };

  var categories = [];

  function paginate(objectPerPage) {

    angular.forEach(items, function(category) {

      events = [];

      angular.forEach(category.events, function(event, index) {
        if(index == 0 || index % objectPerPage == 0) {
          events.push([event]);
        } else {
          events[events.length - 1].push(event);
        }
      });

      categories.push({
        id: category.id,
        events: events
      });

    });

  };

  function getPagination(id, page) {

    var category;

    angular.forEach(categories, function(entry) {
      if(entry.id == id) {
        category = entry;
      }
    })

    var totalPages = category.events.length;
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
      events: category.events[page - 1],
      pages: _.range(startingPage, endingPage + 1),
      page: page,
      totalPages: totalPages
    };

  };

  return {
    getAllCategories: getAllCategories,
    refreshAllCategories: refreshAllCategories,
    paginate: paginate,
    getPagination: getPagination
  };

});
