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
    'first_name', 'last_name', 'email', 'password'
  ];

  /**
  * The attributes that should be hidden for arrays.
  *
  * @var array
  */
  protected $hidden = [
    'password', 'confirmation_token'
  ];

  /**
  * Get the category record associated with the user.
  */
  public function category()
  {
    return $this->hasOne('App\Category');
  }

  /**
  * Get the password resets for the user.
  */
  public function password_resets()
  {
    return $this->hasMany('App\PasswordReset');
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
