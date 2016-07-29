<?php
namespace App\Transformers;

use App\Item;
use League\Fractal;

class ItemTransformer extends Fractal\TransformerAbstract
{
	public function transform(Item $item)
	{
		/*
		$events = $item->events()->orderBy('starting_date', 'desc')->get();
		
		foreach($events as &$event) {
			
		}
		*/
		
	    return [
	        'id' => $item->id,
	        'name' => $item->name,
	        'description' => $item->description,
	        'amount' => $item->amount,
	        'events' => $item->events()->orderBy('starting_date', 'desc')->get()
	    ];
	}
}
