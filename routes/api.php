<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/update-calendly', function (Request $request) {
    $request->validate([
        'calendly_link' => 'nullable|url',
    ]);

    /** @var \App\Models\User */
    $user = auth()->user();
    $user->calendly_link = $request->calendly_link;
    $user->save();

    return response()->json(['message' => 'Calendly link updated successfully!']);
});
