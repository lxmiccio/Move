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
			'maximum_partecipants' => $event->maximum_partecipants,
			'image' => $event->image,
			'category' => $event->category,
			'partecipants' => $event->partecipants()->orderBy('name')->get()
		];
	}
}
