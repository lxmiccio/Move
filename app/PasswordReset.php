<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    /**
     * Get the user that owns the password reset.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
