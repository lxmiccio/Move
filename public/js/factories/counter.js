angular.module('myServices').factory('counterService', function ($http) {

	function getAll(onSuccess, onError) {
		$http.get('api/counters').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/counters/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/counters', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/counters/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function increase(id, onSuccess, onError) {
		$http.put('api/counters/' + id + '/increase').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function remove(id, onSuccess, onError) {
		$http.delete('api/counters/' + id).then(function() {
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
    increase: increase,
		remove: remove
	};

});
