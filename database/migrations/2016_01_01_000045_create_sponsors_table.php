<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSponsorsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('sponsors', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name');
      $table->string('link');
      $table->text('description')->nullable();
      $table->string('image')->nullable();

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
    Schema::drop('sponsors');
  }
}
