<?php

namespace App\Transformers;

use App\Pr;
use League\Fractal;

class PrTransformer extends Fractal\TransformerAbstract
{
	public function transform(Pr $pr)
	{
		return [
			'id' => $pr->id,
			'firstName' => $pr->first_name,
			'lastName' => $pr->last_name,
			'partecipants' => $pr->partecipants()->orderBy('last_name')->get(),
			'categories' => $pr->categories()->orderBy('name')->get()
		];
	}
}
