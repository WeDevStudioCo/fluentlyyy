<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentProfileController extends Controller
{
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

    public function edit(Request $request)
    {
        $user = $request->user();
        $studentProfile = $user->studentProfile;

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

        return Inertia::render('Students/Profile/Edit', [
            'student' => [
                'id' => $studentProfile->id,
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
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'bio' => 'nullable|string',
            'learning_goals' => 'nullable|array',
            'languages_learning' => 'nullable|array',
            'interests' => 'nullable|array',
            'current_language_level' => 'nullable|string',
            'preferred_lesson_duration' => 'nullable|string',
            'availability' => 'nullable|array',
            'preferred_teaching_style' => 'nullable|array',
            'budget_per_hour' => 'nullable|numeric|min:0',
            'timezone' => 'nullable|string',
            'profile_picture' => 'nullable|string',
        ]);

        $studentProfile = $request->user()->studentProfile;
        $studentProfile->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
} 