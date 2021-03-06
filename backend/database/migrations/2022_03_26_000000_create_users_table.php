<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->integer('age')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('group_id')->constrained('permissions');
            $table->string('avatar_url')->nullable();
        });

        //Pradinio administratoriaus paskyra
        DB::table('users')->insert(
            array(
                'username' => 'admin',
                'email' => 'admin123@gmail.com',
                'password' => bcrypt('admin123'),
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'age' => '0',
                'city' => 'Kaunas',
                'country' => 'Lietuva',
                'group_id' => '2',
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
