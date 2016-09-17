<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Event;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\EventTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class EventController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show', 'increase']]);
  }

  public function index()
  {
    return $this->response->collection(Event::all(), new EventTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:events,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Event::find($id), new EventTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'starting_date', 'category_id']), [
      'name' => 'required',
      'starting_date' => 'required|date_format:Y-m-d H:i:s',
      'category_id' => 'required|exists:categories,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = new Event;

    $event->name = $request->get('name');
    $event->starting_date = $request->get('starting_date');
    $event->maximum_partecipants = 100000;
    $event->description = $request->get('description');
    $event->image = $request->get('image');
    $event->category_id = $request->get('category_id');

    if($event->save()) {
      return $this->response->item(Event::find($event->id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_event');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'starting_date'])), [
      'id' => 'required|exists:events,id',
      'name' => 'required',
      'starting_date' => 'required|date_format:Y-m-d H:i:s'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $event->name = $request->get('name');
    $event->starting_date = $request->get('starting_date');
    $event->partecipants_counter = $request->get('partecipants_counter');
    $event->description = $request->get('description');
    $event->image = $request->get('image');

    if($event->save()) {
      return $this->response->item(Event::find($event->id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_event');
    }
  }

  public function increase($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:events,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $event->partecipants_counter += 1;

    if($event->save()) {
      return $this->response->item(Event::find($event->id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_event');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:events,id'
    ]);

    $event = Event::find($id);

    $event->partecipants()->delete();

    if($event->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_event');
    }
  }
}
