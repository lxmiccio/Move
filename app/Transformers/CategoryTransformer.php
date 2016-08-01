<?php

namespace App\Transformers;

use App\Category;
use League\Fractal;

class CategoryTransformer extends Fractal\TransformerAbstract
{
  public function transform(Category $category)
  {

    $events = [];

    foreach ($category->events()->orderBy('starting_date')->get() as $event) {
      $partecipants = [];

      foreach($event->partecipants()->orderBy('name')->get() as $partecipant) {
        $partecipants[] = [
          'name' => $partecipant->name,
          'pr' => $partecipant->pr()->get(['id', 'first_name as firstName', 'last_name as lastName'])->first()
        ];
      }

      $events[] = [
        'id' => $event->id,
  			'name' => $event->name,
  			'description' => $event->description,
  			'startingDate' => $event->starting_date,
  			'maximumPartecipants' => $event->maximum_partecipants,
  			'image' => $event->image,
  			'category' => $event->category()->get(['id', 'name', 'description'])->first(),
  			'partecipants' => $partecipants
      ];
    }

    return [
      'id' => $category->id,
      'name' => $category->name,
      'description' => $category->description,
      'image' => $category->image,
      'user' => $category->user()->get(['id', 'first_name AS firstName', 'last_name AS lastName', 'email'])->first(),
      'events' => $events,
      'prs' => $category->prs()->orderBy('last_name')->get(['prs.id', 'first_name AS firstName', 'last_name AS lastName'])
    ];
  }
}
