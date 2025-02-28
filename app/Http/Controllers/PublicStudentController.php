<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicStudentController extends Controller
{
    public function index()
    {
        $students = StudentProfile::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->user->name,
                    'bio' => $student->bio,
                    'languages_learning' => $student->languages_learning,
                    'current_language_level' => $student->current_language_level,
                    'preferred_lesson_duration' => $student->preferred_lesson_duration,
                    'budget_per_hour' => $student->budget_per_hour,
                    'profile_picture' => $student->profile_picture,
                ];
            });

        return Inertia::render('Students/Index', [
            'students' => $students,
        ]);
    }

    public function show(StudentProfile $student)
    {
        $student->load('user');
        
        return Inertia::render('Students/Profile/Show', [
            'student' => [
                'id' => $student->id,
                'name' => $student->user->name,
                'bio' => $student->bio,
                'learning_goals' => $student->learning_goals,
                'languages_learning' => $student->languages_learning,
                'interests' => $student->interests,
                'current_language_level' => $student->current_language_level,
                'preferred_lesson_duration' => $student->preferred_lesson_duration,
                'availability' => $student->availability,
                'preferred_teaching_style' => $student->preferred_teaching_style,
                'budget_per_hour' => $student->budget_per_hour,
                'timezone' => $student->timezone,
                'profile_picture' => $student->profile_picture,
            ],
        ]);
    }
} 