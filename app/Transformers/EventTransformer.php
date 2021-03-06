<?php

namespace App\Transformers;

use App\Event;
use League\Fractal;

class EventTransformer extends Fractal\TransformerAbstract
{
  public function transform(Event $event)
  {
    $partecipants = [];

    foreach($event->partecipants()->orderBy('name')->get() as $partecipant) {
      $partecipants[] = [
        'id' => $partecipant->id,
        'name' => $partecipant->name,
        'token' => $partecipant->token,

        'pr' => $partecipant->pr()->get([
          'id',
          'first_name as firstName',
          'last_name as lastName'
        ])
        ->first()
      ];
    }

    return [
      'id' => $event->id,
      'description' => $event->description,
      'image' => $event->image,
      'maximumPartecipants' => $event->maximum_partecipants,
      'name' => $event->name,
      'partecipantsCounter' => $event->partecipants_counter,
      'startingDate' => $event->starting_date,

      'category' => $event->category()->get([
        'id',
        'name'
      ])
      ->first(),

      'partecipants' => $partecipants
    ];
  }
}
