<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\CategoryTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
    $this->middleware('jwt.refresh', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Category::all(), new CategoryTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:categories,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Category::find($id), new CategoryTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name']), [
      'name' => 'required',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $category = new Category;

    $category->name = $request->get('name');
    $category->description = $request->get('description');
    $category->image = $request->get('image');

    if($category->save()) {
      return $this->response->item(Category::find($category->id), new CategoryTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_category');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name'])), [
      'id' => 'required|exists:categories,id',
      'name' => 'required',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $category = Category::find($id);

    $category->name = $request->get('name');
    $category->description = $request->get('description');
    $category->image = $request->get('image');

    if($category->save()) {
      return $this->response->item(Category::find($category->id), new CategoryTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_category');
    }
  }

  public function attachPr(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['pr_id'])), [
      'id' => 'required|exists:categories,id',
      'pr_id' => 'required|exists:prs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $category = Category::find($id);

    $count = count($category->prs()->get());
    $category->prs()->attach($request->get('pr_id'));

    if(count($category->prs()->get()) > $count) {
      return $this->response->item(Category::find($category->id), new CategoryTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_attach_pr');
    }
  }

  public function detachPr(Request $request, $id) {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['pr_id'])), [
      'id' => 'required|exists:categories,id',
      'pr_id' => 'required|exists:prs,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $category = Category::find($id);

    $count = count($category->prs()->get());
    $category->prs()->detach($request->get('pr_id'));

    if(count($category->prs()->get()) < $count) {
      return $this->response->item(Category::find($category->id), new CategoryTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_detach_pr');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:categories,id'
    ]);

    $category = Category::find($id);

    if($category->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_category');
    }
  }
}
