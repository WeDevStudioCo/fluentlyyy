<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherDashboardController;
use App\Http\Controllers\TeacherProfileController;
use App\Http\Controllers\PublicTeacherController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\PublicStudentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// This route is used to display the dashboard page for admins
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'role:admin'])->name('dashboard');

// Users with role "teachers" will be able to access this route
Route::middleware(['auth', 'role:teacher'])->group(function () {
    Route::get('/teacher-dashboard', [TeacherDashboardController::class, 'index'])->name('teacher.dashboard');
    Route::get('/teacher-profile', [TeacherProfileController::class, 'edit'])->name('teacher.profile.edit');
    Route::post('/teacher-profile', [TeacherProfileController::class, 'update'])->name('teacher.profile.update');
});

// Public routes for viewing teacher profiles
// Route::get('/teachers/{id}', [TeacherProfileController::class, 'show'])->name('teacher.profile.show');

// Users with role "students" will be able to access this route
Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student-dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
    Route::get('/student-profile', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::post('/student-profile', [StudentProfileController::class, 'update'])->name('student.profile.update');
});

// Public routes for viewing student profiles
Route::get('/students/{student}', [StudentProfileController::class, 'show'])->name('students.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Public teacher routes
Route::get('/teachers', [PublicTeacherController::class, 'index'])->name('teachers.index');
Route::get('/teachers/{teacher}', [PublicTeacherController::class, 'show'])->name('teachers.show');

// Public student routes
Route::get('/students', [PublicStudentController::class, 'index'])->name('students.index');
Route::get('/students/{student}', [PublicStudentController::class, 'show'])->name('students.show');

require __DIR__.'/auth.php';
