<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartecipantsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('partecipants', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name');

      $table->integer('event_id')->unsigned();
      $table->foreign('event_id')->references('id')->on('events');

      $table->integer('pr_id')->unsigned();
      $table->foreign('pr_id')->references('id')->on('prs');

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
    Schema::drop('partecipants');
  }
}
