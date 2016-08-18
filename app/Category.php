<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $fillable = [
		'name', 'image',
	];

	protected $hidden = [
    'pivot'
  ];

  /**
  * Get the users for the category.
  */
  public function users()
  {
    return $this->hasMany('App\User');
  }

	/**
	* Get the events for the category.
	*/
	public function events()
	{
		return $this->hasMany('App\Event');
	}

	/**
	* Get the prs that belong to the category.
	*/
	public function prs()
	{
		return $this->belongsToMany('App\Pr');
	}
}
