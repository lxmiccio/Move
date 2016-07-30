<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Pr;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\PrTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class PrController extends Controller
{
  use Helpers;

  public function index()
  {
    return $this->response->collection(Pr::all(), new PrTransformer);
  }



  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:prs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Pr::find($id), new PrTransformer);
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

    $pr = new Pr;

    $pr->first_name = $request->get('first_name');
    $pr->last_name = $request->get('last_name');

    if($pr->save()) {
      return $this->response->item($pr, new PrTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_pr');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['first_name', 'last_name'])), [
      'id' => 'required|exists:prs,id',
      'first_name' => 'required',
      'last_name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $pr = Pr::find($id);

    $pr->first_name = $request->get('first_name');
    $pr->last_name = $request->get('last_name');

    if($pr->save()) {
      return $this->response->item($pr, new PrTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_pr');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:prs,id'
    ]);

    $pr = Pr::find($id);

    if($pr->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_pr');
    }
  }
}
