<?php

namespace App\Transformers;

use App\Counter;
use League\Fractal;

class CounterTransformer extends Fractal\TransformerAbstract
{
	public function transform(Counter $counter)
	{
		return [
			'id' => $counter->id,
			'visitors' => $counter->visitors
		];
	}
}
