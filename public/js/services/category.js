angular.module('myServices').factory('categoryService', function ($http) {

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
		$http.post('api/categories', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/categories/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attachPr(id, data, onSuccess, onError) {
		$http.put('api/categories/' + id + '/attach/pr', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function detachPr(id, data, onSuccess, onError) {
		$http.put('api/categories/' + id + '/detach/pr', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function remove(id, onSuccess, onError) {
		$http.delete('api/categories/' + id).then(function() {
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
		attachPr: attachPr,
		detachPr: detachPr,
		remove: remove
	};

});
