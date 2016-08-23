<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDjsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('djs', function (Blueprint $table) {
      $table->increments('id');

      $table->string('first_name');
      $table->string('last_name');
      $table->text('description')->nullable();
      $table->string('external_image')->nullable();
      $table->string('internal_image')->nullable();

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
    Schema::drop('djs');
  }
}
