<?php
namespace App\Transformers;

use App\Classroom;
use League\Fractal;

class ClassroomTransformer extends Fractal\TransformerAbstract
{
	public function transform(Classroom $classroom)
	{
	    return [
	        'id' => $classroom->id,
	        'name' => $classroom->name,
	        'description' => $classroom->description,
	        'maximum_partecipants' => $classroom->maximum_partecipants,
	        'events' => $classroom->events()->orderBy('starting_date', 'desc')->get()
	    ];
	}
}
