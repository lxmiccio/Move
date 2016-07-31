<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Partecipant;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ClassroomTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class PartecipantController extends Controller
{
  use Helpers;

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
    $validator = Validator::make($request->only(['name']), [
      'name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $partecipants = new Partecipant;

    $partecipants->name = $request->get('name');

    if($partecipants->save()) {
      return $this->response->item($partecipants, new PartecipantTransformer);
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

    $partecipants = Partecipant::find($id);

    $partecipants->name = $request->get('name');

    if($partecipants->save()) {
      return $this->response->item($partecipants, new PartecipantTransformer);
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

    $partecipants = Partecipant::find($id);

    if($partecipants->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_partecipant');
    }
  }
}
