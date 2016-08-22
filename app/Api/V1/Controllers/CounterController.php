<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Counter;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\CounterTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use LRedis;

class CounterController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show', 'increase']]);
  }

  public function index()
  {
    return $this->response->collection(Counter::all(), new CounterTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:counters,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Counter::find($id), new CounterTransformer);
  }

  public function store(Request $request)
  {
    $counter = new Counter;

    if($request->get('visitors')) {
      $counter->visitors = $request->get('visitors');
    }

    if($counter->save()) {
      return $this->response->item(Counter::find($counter->id), new CounterTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_counter');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['visitors'])), [
      'id' => 'required|exists:counters,id',
      'visitors' => 'required|integer'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $counter = Counter::find($id);

    $counter->visitors = $request->get('visitors');

    if($counter->save()) {
      $redis = LRedis::connection();
      $redis->publish('counter.increase', json_encode([
        'counter' => (new CounterTransformer)->transform(Counter::find($counter->id))
      ]));

      return $this->response->noContent();
    }else {
      return $this->response->errorInternal('could_not_update_counter');
    }
  }

  public function increase($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:counters,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $counter = Counter::find($id);

    $counter->visitors += 1;

    if($counter->save()) {
      $redis = LRedis::connection();
      $redis->publish('counter.increase', json_encode([
        'counter' => (new CounterTransformer)->transform(Counter::find($counter->id))
      ]));

      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_update_counter');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:counters,id'
    ]);

    $counter = Counter::find($id);

    if($counter->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_counter');
    }
  }
}
