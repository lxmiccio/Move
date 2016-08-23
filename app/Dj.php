<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dj extends Model
{
  protected $fillable = [
    'first_name', 'last_name', 'description', 'external_image', 'internal_image'
  ];
}
