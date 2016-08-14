<?php

namespace App\Api\V1\Controllers;

use Config;
use JWTAuth;
use Mail;
use Validator;
use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use App\User;
use Carbon\Carbon;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
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
    $this->middleware('jwt.refresh', ['only' => ['me']]);
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

  public function login(Request $request)
  {
    $validator = Validator::make($request->only(['username', 'password']), [
      'username' => 'required|exists:users,username',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    try {
      if(!$token = JWTAuth::attempt(array_merge(['email' => User::where('username', $request->only(['username']))->first()->email], $request->only(['password'])))) {
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
    $validator = Validator::make($request->only(['first_name', 'last_name', 'username', 'email', 'password']), [
      'first_name' => 'required',
      'last_name' => 'required',
      'username' => 'required|unique:users,username',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = new User;

    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
    $user->username = $request->get('username');
    $user->email = $request->get('email');
    $user->password = $request->get('password');

    if($user->save()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_create_user');
    }
  }

  public function recovery(Request $request)
  {
    $validator = Validator::make($request->only(['username']), [
      'username' => 'required|exists:users,username'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::sendResetLink(['email' => User::where('username', $request->only(['username']))->first()->email], function (Message $message) {
      $message->subject('Move - Modifica la tua Password');
    });

    if($response == Password::RESET_LINK_SENT) {
      return $this->response->noContent();
    }
    else if($response == Password::INVALID_USER){
      return $this->response->errorNotFound('user_not_found');
    }
  }

  public function reset(Request $request)
  {
    $validator = Validator::make($request->only(['token', 'username', 'password', 'password_confirmation']), [
      'token' => 'required',
      'username' => 'required|exists:users,username',
      'password' => 'required|confirmed|min:6',
      'password_confirmation' => 'required|min:6',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::reset(array_merge(['email' => User::where('username', $request->only(['username']))->first()->email], $request->only(['token', 'password', 'password_confirmation'])), function ($user, $password) {
      $user->password = $password;
      $user->save();
    });

    if($response == Password::PASSWORD_RESET) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_reset_password');
    }
  }
}
