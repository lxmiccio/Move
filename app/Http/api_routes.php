<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('auth/me', 'App\Api\V1\Controllers\AuthController@me');
	$api->get('auth/refresh', 'App\Api\V1\Controllers\AuthController@refresh');
	$api->get('auth/logout', 'App\Api\V1\Controllers\AuthController@logout');
	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

	$api->resource('categories', 'App\Api\V1\Controllers\CategoryController');
	$api->put('categories/{id}/attach/pr', 'App\Api\V1\Controllers\CategoryController@attachPr');
	$api->put('categories/{id}/detach/pr', 'App\Api\V1\Controllers\CategoryController@detachPr');

	$api->resource('counters', 'App\Api\V1\Controllers\CounterController');
	$api->put('counters/{id}/increase', 'App\Api\V1\Controllers\CounterController@increase');

	$api->resource('events', 'App\Api\V1\Controllers\EventController');

	$api->resource('partecipants', 'App\Api\V1\Controllers\PartecipantController');

	$api->resource('prs', 'App\Api\V1\Controllers\PrController');

});
