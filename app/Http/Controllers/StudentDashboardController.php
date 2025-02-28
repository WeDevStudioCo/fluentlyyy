<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TeacherProfile;
use App\Models\StudentProfile;

class StudentDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $studentProfile = $user->studentProfile;

        // Create a default student profile if it doesn't exist
        if (!$studentProfile) {
            $studentProfile = StudentProfile::create([
                'user_id' => $user->id,
                'bio' => '',
                'learning_goals' => [],
                'languages_learning' => [],
                'interests' => [],
                'current_language_level' => 'Beginner',
                'preferred_lesson_duration' => '60 minutes',
                'availability' => [],
                'preferred_teaching_style' => [],
                'budget_per_hour' => 25.00,
                'timezone' => 'UTC',
            ]);
        }

        // Get recommended teachers based on student's preferences
        $recommendedTeachers = collect([]);
        if (!empty($studentProfile->languages_learning)) {
            $recommendedTeachers = TeacherProfile::with('user')
                ->whereJsonContains('languages', $studentProfile->languages_learning)
                ->where('is_accepting_students', true)
                ->where('hourly_rate', '<=', $studentProfile->budget_per_hour ?? PHP_FLOAT_MAX)
                ->limit(3)
                ->get()
                ->map(function ($teacher) {
                    return [
                        'id' => $teacher->id,
                        'name' => $teacher->user->name,
                        'bio' => $teacher->bio,
                        'languages' => $teacher->languages,
                        'hourly_rate' => $teacher->hourly_rate,
                        'profile_picture' => $teacher->profile_picture,
                        'teaching_certificates' => $teacher->teaching_certificates,
                    ];
                });
        }

        return Inertia::render('Students/Dashboard', [
            'student' => [
                'name' => $user->name,
                'profile' => [
                    'bio' => $studentProfile->bio,
                    'learning_goals' => $studentProfile->learning_goals ?? [],
                    'languages_learning' => $studentProfile->languages_learning ?? [],
                    'interests' => $studentProfile->interests ?? [],
                    'current_language_level' => $studentProfile->current_language_level,
                    'preferred_lesson_duration' => $studentProfile->preferred_lesson_duration,
                    'availability' => $studentProfile->availability ?? [],
                    'preferred_teaching_style' => $studentProfile->preferred_teaching_style ?? [],
                    'budget_per_hour' => $studentProfile->budget_per_hour,
                    'timezone' => $studentProfile->timezone,
                    'profile_picture' => $studentProfile->profile_picture,
                ],
            ],
            'recommendedTeachers' => $recommendedTeachers,
            // Add more dashboard data as needed
        ]);
    }
}
