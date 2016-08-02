<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pr extends Model
{
  protected $fillable = [
    'first_name', 'last_name'
  ];

	protected $hidden = [
    'pivot'
  ];

  /**
  * Get the partecipants for the pr.
  */
  public function partecipants()
  {
    return $this->hasMany('App\Partecipant');
  }

  /**
  * Get the categories that belong to the pr.
  */
  public function categories()
  {
    return $this->belongsToMany('App\Category');
  }
}
