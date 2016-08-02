<?php

namespace App\Transformers;

use App\Pr;
use League\Fractal;

class PrTransformer extends Fractal\TransformerAbstract
{
  public function transform(Pr $pr)
  {
    return [
      'id' => $pr->id,
      'firstName' => $pr->first_name,
      'lastName' => $pr->last_name,

      'categories' => $pr->categories()->orderBy('name')->get(['categories.id', 'categories.description', 'categories.name']),
      'partecipants' => $pr->partecipants()->orderBy('name')->get(['id', 'name'])
    ];
  }
}
