<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentProfile extends Model
{
    protected $fillable = [
        'user_id',
        'bio',
        'learning_goals',
        'languages_learning',
        'interests',
        'current_language_level',
        'preferred_lesson_duration',
        'availability',
        'preferred_teaching_style',
        'budget_per_hour',
        'timezone',
        'profile_picture',
    ];

    protected $casts = [
        'learning_goals' => 'array',
        'languages_learning' => 'array',
        'interests' => 'array',
        'availability' => 'array',
        'preferred_teaching_style' => 'array',
        'budget_per_hour' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
} 