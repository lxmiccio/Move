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
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'email' => $user->email,
			'category' => $user->category()->get(['id', 'name', 'description'])->first()
		];
	}
}
