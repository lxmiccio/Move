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
			'username' => $user->username,

			'category' => $user->category()->get([
				'id',
				'name',
				'image'
			])
			->first()
		];
	}
}
