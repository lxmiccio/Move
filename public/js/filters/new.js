angular.module('myFilters').filter('new', function() {
  return function (prs, category) {
    if(angular.isArray(prs) && angular.isArray(category.prs)) {
      var newPrs = [];

      angular.forEach(prs, function(pr) {
        var found = false;

        angular.forEach(category.prs, function(categoryPr) {
          if(categoryPr.id == pr.id) {
            found = true;
          }
        });

        if(!found) {
          newPrs.push({
            id: pr.id,
            firstName: pr.firstName,
            lastName: pr.lastName,
            ticked: false
          });
        }
      });

      return newPrs;
    } else {
      return prs;
    }
  };
});
