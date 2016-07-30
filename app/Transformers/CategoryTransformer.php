<?php

namespace App\Transformers;

use App\Category;
use League\Fractal;

class CategoryTransformer extends Fractal\TransformerAbstract
{
	public function transform(Category $category)
	{
		return [
			'id' => $category->id,
			'name' => $category->name,
			'description' => $category->description,
			'image' => $category->image,
			'user' => $category->user,
			'events' => $category->events()->orderBy('starting_date')->get(),
			'prs' => $category->prs()->orderBy('last_name')->get()
		];
	}
}
