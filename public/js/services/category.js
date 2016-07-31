angular.module('myServices').factory('categoryService', function ($http, userService) {

	function getAll(onSuccess, onError) {

		$http.get('api/categories').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function getById(id, onSuccess, onError) {

		$http.get('api/categories/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/categories?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/categories/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function attachPr(id, data, onSuccess, onError) {

		$http.put('api/categories/' + id + '/attach/pr?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function detachPr(id, data, onSuccess, onError) {

		$http.put('api/categories/' + id + '/detach/pr?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function remove(id, onSuccess, onError) {

		$http.delete('api/categories/' + id + '?token=' + userService.getToken()).then(function() {
			onSuccess();
		}, function(response){
			onError(response);
		});

	};

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		attachPr: attachPr,
		detachPr: detachPr,
		remove: remove
	};

});
