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
      'description' => $dj->description,
      'firstName' => $dj->first_name,
      'externalImage' => $dj->external_image,
      'internalImage' => $dj->internal_image,
      'lastName' => $dj->last_name
    ];
  }
}
