angular.module('myServices').factory('prService', function ($http, userService) {

	function getAll(onSuccess, onError) {

		$http.get('api/prs').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function getById(id, onSuccess, onError) {

		$http.get('api/prs/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/prs?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/prs/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function remove(id, onSuccess, onError) {

		$http.delete('api/prs/' + id + '?token=' + userService.getToken()).then(function() {
			onSuccess();
		}, function(response) {
			onError(response);
		});

	};

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove
	};

});
