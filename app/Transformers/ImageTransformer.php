<?php

namespace App\Transformers;

use App\Image;
use League\Fractal;

class ImageTransformer extends Fractal\TransformerAbstract
{
	public function transform(Image $image)
	{
		return [
			'id' => $image->id,
			'image' => $image->image
		];
	}
}
