<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Item;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ItemTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    use Helpers;
    
    public function index()
    {
		return $this->response->collection(Item::all(), new ItemTransformer);
    }
}
