<?php

namespace App\Transformers;

use App\Log;
use League\Fractal;

class LogTransformer extends Fractal\TransformerAbstract
{
	public function transform(Log $log)
	{
		return [
			'id' => $log->id,
      'createdAt' => $log->created_at,

      'user' => $log->user()->get([
				'id',
				'first_name as firstName',
				'last_name as lastName',
        'username'
			])
			->first()
		];
	}
}
