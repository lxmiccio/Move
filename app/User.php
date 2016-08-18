<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
  /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
  protected $fillable = [
    'first_name', 'last_name', 'user', 'password'
  ];

  /**
  * The attributes that should be hidden for arrays.
  *
  * @var array
  */
  protected $hidden = [
    'password'
  ];

	/**
	* Get the category that owns the user.
	*/
	public function category()
	{
		return $this->belongsTo('App\Category');
	}

  /**
  * This mutator automatically hashes the password.
  *
  * @var string
  */
  public function setPasswordAttribute($value)
  {
    $this->attributes['password'] = \Hash::make($value);
  }
}
