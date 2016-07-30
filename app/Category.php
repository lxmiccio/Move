<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
	protected $fillable = [
        'name', 'description', 'image',
    ];

    /**
     * Get the user that owns the category.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
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