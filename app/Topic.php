<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'name', 'description',
    ];
    
    /**
     * Get the events for the classroom.
     */
    public function event()
    {
        return $this->hasMany('App\Event');
    }
}
