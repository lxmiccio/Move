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
				'name' => $partecipant->name,
				'pr' => $partecipant->pr()->get(['id', 'first_name as firstName', 'last_name as lastName'])->first()
			];
		}

		return [
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
}
