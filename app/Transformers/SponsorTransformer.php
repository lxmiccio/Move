<?php

namespace App\Transformers;

use App\Sponsor;
use League\Fractal;

class SponsorTransformer extends Fractal\TransformerAbstract
{
  public function transform(Sponsor $sponsor)
  {
    return [
      'id' => $sponsor->id,
      'description' => $sponsor->description,
      'image' => $sponsor->image,
      'link' => $sponsor->link,
      'name' => $sponsor->name
    ];
  }
}
