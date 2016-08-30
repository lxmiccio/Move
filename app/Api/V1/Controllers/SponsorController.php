<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Sponsor;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\SponsorTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class SponsorController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Sponsor::all(), new SponsorTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:sponsors,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Sponsor::find($id), new SponsorTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'link']), [
      'name' => 'required',
      'link' => 'required|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $sponsor = new Sponsor;

    $sponsor->name = $request->get('name');
    $sponsor->link = $request->get('link');
    $sponsor->description = $request->get('description');
    $sponsor->image = $request->get('image');

    if($sponsor->save()) {
      return $this->response->item(Sponsor::find($sponsor->id), new SponsorTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_sponsor');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'link'])), [
      'id' => 'required|exists:sponsors,id',
      'name' => 'required',
      'link' => 'required|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $sponsor = Sponsor::find($id);

    $sponsor->name = $request->get('name');
    $sponsor->link = $request->get('link');
    $sponsor->description = $request->get('description');
    $sponsor->image = $request->get('image');

    if($sponsor->save()) {
      return $this->response->item(Sponsor::find($id), new SponsorTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_sponsor');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:sponsors,id'
    ]);

    $sponsor = Sponsor::find($id);

    if($sponsor->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_sponsor');
    }
  }
}
