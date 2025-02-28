<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = User::role('student')->select(['id', 'name', 'email']);

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->search}%")
                  ->orWhere('email', 'LIKE', "%{$request->search}%");
            });
        }

        $students = $query->get();

        return Inertia::render('Teachers/TeacherDashboard', [
            'students' => $students,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }
}
