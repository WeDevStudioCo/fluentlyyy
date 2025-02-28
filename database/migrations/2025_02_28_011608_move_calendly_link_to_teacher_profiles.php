<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\TeacherProfile;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add calendly_link to teacher_profiles table
        Schema::table('teacher_profiles', function (Blueprint $table) {
            $table->string('calendly_link')->nullable();
        });

        // Move calendly_link from users to teacher_profiles
        $users = User::whereNotNull('calendly_link')->get();
        foreach ($users as $user) {
            $teacherProfile = TeacherProfile::where('user_id', $user->id)->first();
            if ($teacherProfile) {
                $teacherProfile->update(['calendly_link' => $user->calendly_link]);
            }
        }

        // Remove calendly_link from users table
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('calendly_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add calendly_link back to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('calendly_link')->nullable();
        });

        // Move calendly_link back from teacher_profiles to users
        $teacherProfiles = TeacherProfile::whereNotNull('calendly_link')->get();
        foreach ($teacherProfiles as $profile) {
            $profile->user->update(['calendly_link' => $profile->calendly_link]);
        }

        // Remove calendly_link from teacher_profiles table
        Schema::table('teacher_profiles', function (Blueprint $table) {
            $table->dropColumn('calendly_link');
        });
    }
};
