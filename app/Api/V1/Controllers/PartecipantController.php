<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Partecipant;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\PartecipantTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class PartecipantController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show', 'store']]);
  }

  public function index()
  {
    return $this->response->collection(Partecipant::all(), new PartecipantTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:partecipants,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Partecipant::find($id), new PartecipantTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'event_id', 'pr_id']), [
      'name' => 'required',
      'event_id' => 'required|exists:events,id',
      'pr_id' => 'required|exists:prs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $partecipant = new Partecipant;

    $partecipant->name = $request->get('name');
    $partecipant->event_id = $request->get('event_id');
    $partecipant->pr_id = $request->get('pr_id');

    if($partecipant->save()) {
      return $this->response->item(Partecipant::find($partecipant->save()), new PartecipantTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_partecipant');
    }
  }

  public function update(Request $request, $id)
  {
    $$validator = Validator::make(array_merge(['id' => $id], $request->only(['name'])), [
      'id' => 'required|exists:partecipants,id',
      'name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $partecipant = Partecipant::find($id);

    $partecipant->name = $request->get('name');

    if($partecipant->save()) {
      return $this->response->item(Partecipant::find($partecipant->id), new PartecipantTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_partecipant');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:partecipants,id'
    ]);

    $partecipant = Partecipant::find($id);

    if($partecipant->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_partecipant');
    }
  }
}
