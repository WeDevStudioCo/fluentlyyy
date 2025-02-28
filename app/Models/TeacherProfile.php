<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeacherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'bio',
        'education',
        'teaching_experience',
        'specializations',
        'profile_picture',
        'languages',
        'teaching_certificates',
        'timezone',
        'hourly_rate',
        'availability',
        'video_introduction_url',
        'teaching_methodology',
        'is_accepting_students',
        'calendly_link',
    ];

    protected $casts = [
        'languages' => 'array',
        'teaching_certificates' => 'array',
        'availability' => 'array',
        'teaching_methodology' => 'array',
        'hourly_rate' => 'decimal:2',
        'is_accepting_students' => 'boolean',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
