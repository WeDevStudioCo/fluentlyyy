<?php

namespace App\Http\Controllers;

use App\Models\TeacherProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class TeacherProfileController extends Controller
{
    public function edit()
    {
        $user = auth()->user();
        $profile = $user->teacherProfile ?? new TeacherProfile();

        return Inertia::render('Teachers/Profile/Edit', [
            'profile' => $profile,
            'timezones' => \DateTimeZone::listIdentifiers(),
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        
        $validated = $request->validate([
            'bio' => 'nullable|string|max:1000',
            'education' => 'nullable|string|max:1000',
            'teaching_experience' => 'nullable|string|max:1000',
            'specializations' => 'nullable|string|max:1000',
            'profile_picture' => 'nullable|image|max:1024',
            'languages' => 'nullable|array',
            'languages.*' => 'string',
            'teaching_certificates' => 'nullable|array',
            'teaching_certificates.*' => 'string',
            'timezone' => 'nullable|string|timezone',
            'hourly_rate' => 'nullable|numeric|min:0',
            'availability' => 'nullable|array',
            'video_introduction_url' => 'nullable|url',
            'teaching_methodology' => 'nullable|array',
            'is_accepting_students' => 'boolean',
            'calendly_link' => 'nullable|url',
        ]);

        if ($request->hasFile('profile_picture')) {
            if ($user->teacherProfile?->profile_picture) {
                Storage::delete($user->teacherProfile->profile_picture);
            }
            $validated['profile_picture'] = $request->file('profile_picture')->store('profile-pictures', 'public');
        }

        $profile = $user->teacherProfile()->updateOrCreate(
            [],
            $validated
        );

        return redirect()->back()->with('message', 'Profile updated successfully');
    }

    public function show($id)
    {
        $teacher = TeacherProfile::with('user')->findOrFail($id);
        
        return Inertia::render('Teachers/Profile/Show', [
            'teacher' => $teacher
        ]);
    }
}
