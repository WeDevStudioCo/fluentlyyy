<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = User::role('student')
            ->select(['id', 'name', 'email'])
            ->with('studentProfile:id,user_id,profile_picture');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->search}%")
                    ->orWhere('email', 'LIKE', "%{$request->search}%");
            });
        }

        $sortBy = in_array($request->sort_by, ['name', 'email']) ? $request->sort_by : 'name';
        $sortDir = $request->sort_dir === 'desc' ? 'desc' : 'asc';

        $query->orderBy($sortBy, $sortDir);

        $students = $query->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
                'profile_picture' => optional($student->studentProfile)->profile_picture,
            ];
        });

        return Inertia::render('Teachers/TeacherDashboard', [
            'students' => $students,
            'filters' => [
                'search' => $request->search,
                'sort_by' => $sortBy,
                'sort_dir' => $sortDir,
            ],
        ]);
    }
}
