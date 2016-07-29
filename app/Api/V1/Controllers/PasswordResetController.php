<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\PasswordResets;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ClassroomTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
    //
}
