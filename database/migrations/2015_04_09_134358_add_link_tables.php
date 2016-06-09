<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLinkTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('site_user', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('site_id')->unsigned();
			$table->foreign('site_id')->references('id')->on('sites');
			$table->integer('user_id')->unsigned()->index();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('role_id')->unsigned();
			$table->foreign('role_id')->references('id')->on('roles');
			$table->unique(['user_id', 'site_id', 'role_id']);
		});

		Schema::create('group_user', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('group_id')->unsigned();
			$table->foreign('group_id')->references('id')->on('groups');
			$table->integer('permission_id')->unsigned();
			$table->foreign('permission_id')->references('id')->on('permissions');
		});


		Schema::create('group_resource', function(Blueprint $table)
		{
			$table->integer('group_id')->unsigned()->index();
			$table->foreign('group_id')->references('id')->on('groups');
			$table->integer('resource_id')->unsigned();
			$table->foreign('resource_id')->references('id')->on('resources');
			$table->unique(['group_id', 'resource_id']);
		});

		Schema::create('resourceables', function(Blueprint $table)
		{
			$table->integer('resource_id')->unsigned();
			$table->foreign('resource_id')->references('id')->on('resources');
			$table->integer('resourceable_id')->unsigned();
			$table->string('resourceable_type');
		});
		Schema::create('permission_role', function (Blueprint $table)
		{
			$table->integer('permission_id')->unsigned();
			$table->integer('role_id')->unsigned();
			$table->foreign('permission_id')
				->references('id')
				->on('permissions')
				->onDelete('cascade');
				$table->foreign('role_id')
				->references('id')
				->on('roles')
				->onDelete('cascade');
				$table->primary(['permission_Id', 'role_id']);
});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('site_user');
		Schema::drop('group_user');
		Schema::drop('group_resource');
		Schema::drop('resourceables');

	}

}
