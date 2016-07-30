<?php

namespace App\Api\V1\Controllers;

use Config;
use JWTAuth;
use Mail;
use Validator;
use App\Http\Controllers\Controller;
use App\PasswordReset;
use App\User;
use Carbon\Carbon;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
  use Helpers;

  public function me()
  {
    try {
      if(!$user = JWTAuth::parseToken()->authenticate()) {
        return $this->response->errorNotFound('user_not_found');
      }
    }
    catch(TokenExpiredException $exception) {
      return $this->response->error('token_expired', $exception->getStatusCode());
    }
    catch(TokenInvalidException $exception) {
      return $this->response->error('token_invalid', $exception->getStatusCode());
    }
    catch(JWTException $exception) {
      return $this->response->error('token_absent', $exception->getStatusCode());
    }

    return response()->json(compact('user'));
  }

  public function refresh()
  {
    if(!$token = JWTAuth::getToken()) {
      return $this->response->errorBadRequest('token_not_provided');
    }

    try {
      $token = JWTAuth::refresh($token);
    }
    catch(TokenExpiredException $exception) {
      return $this->response->error('token_expired', $exception->getStatusCode());
    }
    catch(TokenInvalidException $exception) {
      return $this->response->error('token_invalid', $exception->getStatusCode());
    }

    return response()->json(compact('user'));
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->only(['email', 'password']), [
      'email' => 'required|email|unique:users',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    try {
      if(!$token = JWTAuth::attempt($credentials)) {
        return $this->response->errorUnauthorized('could_not_login');
      }
    } catch(JWTException $exception) {
      return $this->response->errorInternal('could_not_create_token');
    }

    return response()->json(compact('token'));
  }

  public function logout()
  {
    JWTAuth::parseToken()->invalidate();

    return $this->response->noContent();
  }

  public function signup(Request $request)
  {
    $validator = Validator::make($request->only(['first_name', 'last_name', 'email', 'password']), [
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = new User;

    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
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
    $validator = Validator::make($request->only('email'), [
      'email' => 'required|email|exists:users,email'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::sendResetLink($request->only('email'), function (Message $message) {
      $message->subject(Config::get('boilerplate.recovery_email_subject'));
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
    $validator = Validator::make($request->only(['token', 'email', 'password', 'password_confirmation']), [
      'token' => 'required',
      'email' => 'required|email',
      'password' => 'required|confirmed|min:6',
      'password_confirmation' => 'required|confirmed|min:6',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::reset($request->only(['token', 'email', 'password', 'password_confirmation']), function ($user, $password) {
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
