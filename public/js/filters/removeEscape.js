angular.module('myFilters').filter('removeEscape', function() {
    return function(string) {
      return string.replace(/\\\"/g,"\"");
    }
});
