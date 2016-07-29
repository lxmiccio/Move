angular.module("myServices").factory("eventService", function ($http, userService) {

	function getAll(onSuccess, onError) {
		
		$http.get('api/events').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};

	function getById(id, onSuccess, onError) {

		$http.get('api/events/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/events?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/events/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};
	
	function attachUser(id, data, onSuccess, onError) {
		
		$http.put('api/events/' + id + '/attach/user?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};
	
	function detachUser(id, data, onSuccess, onError) {
		
		$http.put('api/events/' + id + '/detach/user?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};
	
	function attachItem(id, data, onSuccess, onError) {
		
		$http.put('api/events/' + id + '/attach/item?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};
	
	function detachItem(id, data, onSuccess, onError) {
		
		$http.put('api/events/' + id + '/detach/item?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};

	function remove(id, onSuccess, onError) {
		
		$http.delete('api/events/' + id + '?token=' + userService.getToken()).then(function() {
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
		attachUser: attachUser,
		detachUser: detachUser,
		attachItem: attachItem,
		detachItem: detachItem,
		remove: remove
	};

});
