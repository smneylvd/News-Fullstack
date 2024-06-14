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
        Schema::create('keyword_news', function (Blueprint $table) {

            $table->unsignedBigInteger("news_id");
            $table->unsignedBigInteger("keyword_id");

            $table->unique(['news_id', 'keyword_id']);

            $table->foreign('news_id')->references('id')->on('news');
            $table->foreign('keyword_id')->references('id')->on('keywords');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keyword_news');
    }
};
