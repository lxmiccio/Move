<?php

namespace App\Transformers;

use App\Dj;
use League\Fractal;

class DjTransformer extends Fractal\TransformerAbstract
{
  public function transform(Dj $dj)
  {
    return [
      'id' => $dj->id,
      'firstName' => $dj->first_name,
      'lastName' => $dj->last_name,
      'description' => $dj->description
    ];
  }
}
