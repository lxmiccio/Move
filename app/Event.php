<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name', 'description', 'starting_date', 'maximum_partecipants', 'image'
    ];

    /**
     * Get the category that owns the event.
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

		/**
     * Get the partecipants for the event.
     */
    public function partecipants()
    {
        return $this->hasMany('App\Partecipant');
    }
}
