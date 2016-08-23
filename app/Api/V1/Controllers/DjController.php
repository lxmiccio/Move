<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Dj;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\DjTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class DjController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Dj::all(), new DjTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:djs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Dj::find($id), new DjTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['first_name', 'last_name']), [
      'first_name' => 'required',
      'last_name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $dj = new Dj;

    $dj->first_name = $request->get('first_name');
    $dj->last_name = $request->get('last_name');
    $dj->description = $request->get('description');
    $dj->external_image = $request->get('external_image');
    $dj->internal_image = $request->get('internal_image');

    if($dj->save()) {
      return $this->response->item(Dj::find($dj->id), new DjTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_dj');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['first_name', 'last_name'])), [
      'id' => 'required|exists:djs,id',
      'first_name' => 'required',
      'last_name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $dj = Dj::find($id);

    $dj->first_name = $request->get('first_name');
    $dj->last_name = $request->get('last_name');
    $dj->description = $request->get('description');
    $dj->external_image = $request->get('external_image');
    $dj->internal_image = $request->get('internal_image');

    if($dj->save()) {
      return $this->response->item(Dj::find($id), new DjTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_dj');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:djs,id'
    ]);

    $dj = Dj::find($id);

    if($dj->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_dj');
    }
  }
}
