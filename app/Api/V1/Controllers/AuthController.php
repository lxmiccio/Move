<?php

namespace App\Api\V1\Controllers;

use Config;
use JWTAuth;
use Validator;
use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use App\User;
use Carbon\Carbon;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['only' => ['me', 'logout']]);
    $this->middleware('jwt.refresh', ['only' => ['refresh']]);
  }

  public function me()
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

    return $this->response->item($user, new UserTransformer);
  }

  public function refresh() {

  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->only(['username', 'password']), [
      'username' => 'required|exists:users,username',
      'password' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    try {
      if(!$token = JWTAuth::attempt(array_merge(['username' => $request->only(['username'])], $request->only(['password'])))) {
        return $this->response->errorUnauthorized('could_not_login');
      }
    } catch(JWTException $exception) {
      return $this->response->errorInternal('could_not_create_token');
    }

    return response()->json(compact('token'));
  }

  public function logout()
  {
    if(JWTAuth::parseToken()->invalidate()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_logout');
    }
  }

  public function signup(Request $request)
  {
    $validator = Validator::make($request->only(['first_name', 'last_name', 'username', 'password']), [
      'first_name' => 'required',
      'last_name' => 'required',
      'username' => 'required|unique:users,username',
      'password' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = new User;

    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
    $user->username = $request->get('username');
    $user->password = $request->get('password');

    if($user->save()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_create_user');
    }
  }
}
