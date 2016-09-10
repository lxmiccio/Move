<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Image;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ImageTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class ImageController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Image::orderBy('created_at', 'desc')->get(), new ImageTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:images,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Image::find($id), new ImageTransformer);
  }

  public function store(Request $request)
  {
    // $validator = Validator::make($request->only(['image']), [
    //   'image' => 'required'
    // ]);
    //
    // if($validator->fails()) {
    //   throw new ValidationHttpException($validator->errors()->all());
    // }

    $image = new Image;

    $image->image = $request->get('image');

    if($image->save()) {
      return $this->response->item(Image::find($image->id), new ImageTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_image');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:images,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $image = Image::find($id);

    $image->image = $request->get('image');

    if($image->save()) {
      return $this->response->item(Image::find($id), new ImageTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_image');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:images,id'
    ]);

    $image = Image::find($id);

    if($image->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_image');
    }
  }

  public function upload(Request $request)
  {
    $validator = Validator::make(array_merge(['image' => $_FILES['image']], $request->only(['directory', 'filename'])), [
      'image' => 'required',
      'directory' => 'required',
      'filename' => 'required'
    ]);
    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }
    if(!file_exists('images')) {
      mkdir('images');
    }
    if(!file_exists('images/' . $request->get('directory'))) {
      mkdir('images/' . $request->get('directory'));
    }
    $name = $_FILES['image']['name'];
    $temp = $_FILES['image']['tmp_name'];
    $image = 'images/' . $request->get('directory') . '/' . $request->get('filename') . '.' . pathinfo($name, PATHINFO_EXTENSION);
    if(move_uploaded_file($temp, $image)) {
      return response()->json(compact('image'));
    }
    else {
      return $this->response->errorInternal('could_not_upload_image');
    }
  }

  public function cancel(Request $request)
  {
    $validator = Validator::make($request->only(['image']), [
      'image' => 'required'
    ]);
    if($validator->fails()) {
      return $this->response->noContent();
    }
    if(file_exists($request->get('image'))) {
      if(unlink($request->get('image'))) {
        return $this->response->noContent();
      }
      else {
        return $this->response->errorInternal('could_not_remove_image');
      }
    }
    else {
      return $this->response->noContent();
    }
  }
}
