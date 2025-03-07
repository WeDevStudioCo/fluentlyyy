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
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('bio')->nullable();
            $table->text('education')->nullable();
            $table->text('teaching_experience')->nullable();
            $table->text('specializations')->nullable();
            $table->string('profile_picture')->nullable();
            $table->json('languages')->nullable();
            $table->json('teaching_certificates')->nullable();
            $table->string('timezone')->nullable();
            $table->decimal('hourly_rate', 8, 2)->nullable();
            $table->json('availability')->nullable(); // Store weekly availability
            $table->string('video_introduction_url')->nullable();
            $table->json('teaching_methodology')->nullable();
            $table->boolean('is_accepting_students')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_profiles');
    }
};
