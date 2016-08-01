<?php

namespace App\Transformers;

use App\Category;
use League\Fractal;

class CategoryTransformer extends Fractal\TransformerAbstract
{
  public function transform(Category $category)
  {

    /*
    * use App\Transformers\Event;
    * use League\Fractal\Manager;
    * use League\Fractal\Resource\Collection;
    *
    * $fractal = new Manager();
    * $resource = new Collection($category->events()->orderBy('starting_date')->get(['id', 'name', 'description']), new EventTransformer);
    * $events = current($fractal->createData($resource)->toArray());
    */

    $events = [];

    foreach ($category->events()->orderBy('starting_date')->get() as $event)
      $partecipants = [];

      foreach($event->partecipants()->orderBy('name')->get() as $partecipant) {
        $partecipants[] = [
          'name' => $partecipant->name,
          'pr' => $partecipant->pr()->get(['id', 'first_name as firstName', 'last_name as lastName'])
        ];
      }

      $events['partecipants'] = $partecipants;
    }

    return [
      'id' => $category->id,
      'name' => $category->name,
      'description' => $category->description,
      'image' => $category->image,
      'user' => $category->user()->get(['id', 'first_name AS firstName', 'last_name AS lastName', 'email']),
      'events' => $events,
      'prs' => $category->prs()->orderBy('last_name')->get(['prs.id', 'first_name AS firstName', 'last_name AS lastName'])
    ];
  }
}
