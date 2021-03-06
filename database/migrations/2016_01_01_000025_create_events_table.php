<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('events', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name');
      $table->datetime('starting_date');
      $table->integer('partecipants_counter')->unsigned()->default(0);
      $table->integer('maximum_partecipants')->unsigned();
      $table->text('description')->nullable();
      $table->string('image')->nullable();

      $table->integer('category_id')->unsigned();
      $table->foreign('category_id')->references('id')->on('categories');

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
    Schema::drop('events');
  }
}
