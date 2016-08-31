<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Log;
use App\Transformers\LogTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class LogController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Log::all(), new LogTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:logs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Log::find($id), new LogTransformer);
  }

  public function store(Request $request)
  {
    try {
      if(!$user = JWTAuth::parseToken()->authenticate()) {
        return $this->response->errorNotFound('user_not_found');
      }
    } catch(TokenExpiredException $exception) {
      return $this->response->error('token_expired', $exception->getStatusCode());
    } catch(TokenInvalidException $exception) {
      return $this->response->error('token_invalid', $exception->getStatusCode());
    } catch(JWTException $exception) {
      return $this->response->error('token_absent', $exception->getStatusCode());
    }

    $count = count($user->logs()->get());

    $user->logs()->save(new Log);

    if(count($user->logs()->get()) > $count) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_create_log');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:logs,id'
    ]);

    $log = Log::find($id);

    if($log->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_log');
    }
  }
}
