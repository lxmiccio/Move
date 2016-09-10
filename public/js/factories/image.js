angular.module('myServices').factory('imageService', function ($http, Upload, userService) {

  function getAll(onSuccess, onError) {
    $http.get('api/images').then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function getById(id, onSuccess, onError) {
    $http.get('api/images/' + id).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function create(data, onSuccess, onError) {
    $http.post('api/images', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function update(id, data, onSuccess, onError) {
    $http.put('api/images/' + id, data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function remove(id, onSuccess, onError) {

    $http.delete('api/images/' + id).then(function() {
      onSuccess();
    }, function(response) {
      onError(response);
    });

  };

  function upload(data, onSuccess, onError) {
    Upload.upload({url: 'api/images/upload', data: data}).then(function(response) {
      onSuccess(response)
    }, function(response) {
      onError(response);
    });
  };

  function cancel(data, onSuccess, onError) {
    $http.post('api/images/cancel', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove,
    upload: upload,
    cancel: cancel
  };

});
