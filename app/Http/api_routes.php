<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('auth/me', 'App\Api\V1\Controllers\AuthController@me');
	$api->get('auth/refresh', 'App\Api\V1\Controllers\AuthController@refresh');
	$api->get('auth/logout', 'App\Api\V1\Controllers\AuthController@logout');
	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');

	$api->resource('categories', 'App\Api\V1\Controllers\CategoryController');
	$api->put('categories/{id}/attach/pr', 'App\Api\V1\Controllers\CategoryController@attachPr');
	$api->put('categories/{id}/detach/pr', 'App\Api\V1\Controllers\CategoryController@detachPr');

	$api->resource('counters', 'App\Api\V1\Controllers\CounterController');
	$api->put('counters/{id}/increase', 'App\Api\V1\Controllers\CounterController@increase');

	$api->resource('events', 'App\Api\V1\Controllers\EventController');
	$api->put('events/{id}/increase', 'App\Api\V1\Controllers\EventController@increase');

	$api->resource('djs', 'App\Api\V1\Controllers\DjController');

	$api->resource('images', 'App\Api\V1\Controllers\ImageController');
	$api->post('images/upload', 'App\Api\V1\Controllers\ImageController@upload');
	$api->post('images/cancel', 'App\Api\V1\Controllers\ImageController@cancel');

	$api->get('logs', 'App\Api\V1\Controllers\LogController@index');
	$api->get('logs/{id}', 'App\Api\V1\Controllers\LogController@show');
	$api->post('logs', 'App\Api\V1\Controllers\LogController@store');
	$api->delete('logs/{id}', 'App\Api\V1\Controllers\LogController@destroy');

	$api->resource('partecipants', 'App\Api\V1\Controllers\PartecipantController');

	$api->resource('prs', 'App\Api\V1\Controllers\PrController');

	$api->resource('sponsors', 'App\Api\V1\Controllers\SponsorController');

});
