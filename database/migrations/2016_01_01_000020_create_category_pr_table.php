<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryPrTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('category_pr', function (Blueprint $table) {
      $table->increments('id');

      $table->integer('category_id')->unsigned();
      $table->foreign('category_id')->references('id')->on('categories');

      $table->integer('pr_id')->unsigned();
      $table->foreign('pr_id')->references('id')->on('prs');

      $table->unique(array('category_id','pr_id'));

      $table->timestamps();
    });
  }

  /**
  * Reverse the migrations.
  *
  * @return void
  */
  public function down()
  {
    Schema::drop('category_pr');
  }
}
