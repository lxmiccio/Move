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
          'id' => $partecipant->id,
          'name' => $partecipant->name,

          'pr' => $partecipant->pr()->get(['id', 'first_name as firstName', 'last_name as lastName'])->first()
        ];
      }

      $events[] = [
        'id' => $event->id,
        'description' => $event->description,
        'image' => $event->image,
        'maximumPartecipants' => $event->maximum_partecipants,
        'name' => $event->name,
        'startingDate' => $event->starting_date,

        'partecipants' => $partecipants
      ];
    }

    return [
      'id' => $category->id,
      'description' => $category->description,
      'image' => $category->image,
      'name' => $category->name,

      'events' => $events,
      'prs' => $category->prs()->orderBy('last_name')->get(['prs.id', 'prs.first_name as firstName', 'prs.last_name as lastName']),
      'user' => $category->user()->get(['id', 'first_name as firstName', 'last_name as lastName', 'email'])->first()
    ];
  }
}
