<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('bio')->nullable();
            $table->json('learning_goals')->nullable();
            $table->json('languages_learning')->nullable();
            $table->json('interests')->nullable();
            $table->string('current_language_level')->nullable();
            $table->string('preferred_lesson_duration')->nullable();
            $table->json('availability')->nullable();
            $table->json('preferred_teaching_style')->nullable();
            $table->decimal('budget_per_hour', 8, 2)->nullable();
            $table->string('timezone')->nullable();
            $table->string('profile_picture')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
}; 