<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Teachers/TeacherDashboard');
    }
}
