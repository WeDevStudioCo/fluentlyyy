<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentProfile::with('user:id,name,email');

        if ($request->search) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        if ($request->language) {
            $query->whereJsonContains('languages_learning', $request->language);
        }

        $students = $query->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->user->name,
                'email' => $student->user->email,
                'languages_learning' => $student->languages_learning,
                'budget_per_hour' => $student->budget_per_hour,
            ];
        });

        return Inertia::render('Teachers/TeacherDashboard', [
            'students' => $students,
            'filters' => [
                'search' => $request->search,
                'language' => $request->language,
            ],
        ]);
    }
}
