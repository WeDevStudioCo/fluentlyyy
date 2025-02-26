<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Students/StudentDashboard');
    }
}
