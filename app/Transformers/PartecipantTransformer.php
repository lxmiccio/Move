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
			'event' => $partecipant->event,
			'pr' => $partecipant->pr
		];
	}
}
