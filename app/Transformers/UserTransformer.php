<?php

namespace App\Transformers;

use App\User;
use League\Fractal;

class UserTransformer extends Fractal\TransformerAbstract
{
	public function transform(User $user)
	{
		return [
			'id' => $user->id,
			'email' => $user->email,
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,

			'category' => $user->category()->get(['id', 'description', 'name'])->first()
		];
	}
}
