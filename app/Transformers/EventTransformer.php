<?php
namespace App\Transformers;

use App\Event;
use League\Fractal;

class EventTransformer extends Fractal\TransformerAbstract
{
	public function transform(Event $event)
	{
	    return [
	        'id' => $event->id,
	        'name' => $event->name,
	        'description' => $event->description,
	        'starting_date' => $event->starting_date,
            'ending_date' => $event->ending_date,
            'maximum_partecipants' => $event->maximum_partecipants,
	        'user' => $event->user,
            'classroom' => $event->classroom,
            'topic' => $event->topic,
            'users' => $event->users()->orderBy('last_name')->get(),
            'items' => $event->items()->orderBy('name')->get()
	    ];
	}
}
