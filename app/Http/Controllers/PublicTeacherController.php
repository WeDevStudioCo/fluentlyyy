<?php

namespace App\Http\Controllers;

use App\Models\TeacherProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicTeacherController extends Controller
{
    public function index(Request $request)
    {
        $query = TeacherProfile::with('user')
            ->orderBy('created_at', 'desc');

        // Apply language filter if provided
        if ($request->has('language')) {
            $query->whereJsonContains('languages', $request->language);
        }

        // Apply price range filter if provided
        if ($request->has('max_price')) {
            $query->where('hourly_rate', '<=', $request->max_price);
        }

        if ($request->has('min_price')) {
            $query->where('hourly_rate', '>=', $request->min_price);
        }

        // Only show teachers accepting students by default, unless explicitly showing all
        if (!$request->has('show_all')) {
            $query->where('is_accepting_students', true);
        }

        $teachers = $query->paginate(9)
            ->through(function ($teacher) {
                return [
                    'id' => $teacher->id,
                    'name' => $teacher->user->name,
                    'bio' => $teacher->bio,
                    'languages' => $teacher->languages,
                    'hourly_rate' => $teacher->hourly_rate,
                    'is_accepting_students' => $teacher->is_accepting_students,
                    'profile_picture' => $teacher->profile_picture,
                    'teaching_certificates' => $teacher->teaching_certificates,
                ];
            });

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers,
            'filters' => $request->only(['language', 'min_price', 'max_price', 'show_all']),
        ]);
    }

    public function show(TeacherProfile $teacher)
    {
        $teacher->load('user');
        
        return Inertia::render('Teachers/Profile/Show', [
            'teacher' => [
                'id' => $teacher->id,
                'name' => $teacher->user->name,
                'bio' => $teacher->bio,
                'languages' => $teacher->languages,
                'hourly_rate' => $teacher->hourly_rate,
                'is_accepting_students' => $teacher->is_accepting_students,
                'profile_picture' => $teacher->profile_picture,
                'teaching_certificates' => $teacher->teaching_certificates,
                'teaching_experience' => $teacher->teaching_experience,
                'education' => $teacher->education,
                'specializations' => $teacher->specializations,
                'calendly_link' => $teacher->calendly_link,
                'video_introduction_url' => $teacher->video_introduction_url,
            ],
        ]);
    }
} 