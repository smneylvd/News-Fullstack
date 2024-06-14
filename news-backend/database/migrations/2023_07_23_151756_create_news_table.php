<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(false);
            $table->text('description')->nullable(true);
            $table->string('author')->nullable(true);
            $table->string('original_source_url')->nullable(true);
            $table->unsignedBigInteger('source_id');
            $table->unsignedBigInteger('category_id')->nullable(true);
            $table->string('image_url')->nullable(true);
            $table->dateTime('published_at')->nullable(false);
            $table->timestamps();
            $table->foreign('source_id')->references('id')->on('source_apis');
            $table->foreign('category_id')->references('id')->on('categories');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
