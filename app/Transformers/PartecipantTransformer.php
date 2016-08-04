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
			'token' => $partecipant->token,

			'event' => $partecipant->event()->get(['id', 'description', 'name'])->first(),
			'pr' => $partecipant->pr()->get(['id', 'first_name as firstName', 'last_name as lastName'])->first()
		];
	}
}
