<?php

namespace App\Transformers;

use App\Partecipant;
use League\Fractal;

class PartecipantTransformer extends Fractal\TransformerAbstract
{
	public function transform(Partecipant $partecipant)
	{
		return [
			'id' => $partecipant->id,
			'name' => $partecipant->name,
			'event' => $partecipant->event()->get(['id', 'name', 'description']),
			'pr' => $partecipant->pr()->get(['id', 'first_name AS firstName', 'last_name AS lastName'])
		];
	}
}
