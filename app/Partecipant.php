<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partecipant extends Model
{
  protected $fillable = [
    'name'
  ];

  /**
  * Get the event that owns the partecipant.
  */
  public function event()
  {
    return $this->belongsTo('App\Event');
  }

  /**
  * Get the pr that owns the partecipant.
  */
  public function pr()
  {
    return $this->belongsTo('App\Pr');
  }
}
