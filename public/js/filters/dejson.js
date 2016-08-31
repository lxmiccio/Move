angular.module('myFilters').filter('dejson', function() {
  return function(string) {
    if(string) {
      if(string.charAt(0) == '"' && string.charAt(string.length - 1) == '"') {
        return string.slice(1, -1);
      } else {
        return string;
      }
    } else {
      return string;
    }
  }
});
