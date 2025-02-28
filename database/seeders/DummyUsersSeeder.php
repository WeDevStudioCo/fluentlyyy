<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TeacherProfile;
use App\Models\StudentProfile;
use Illuminate\Support\Facades\Hash;

class DummyUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Create teachers
        $teachers = [
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah@example.com',
                'profile' => [
                    'bio' => "Hi! I'm Sarah, a passionate English teacher with over 8 years of experience teaching students from all around the world. I specialize in conversation and business English.",
                    'languages' => ['English', 'Spanish'],
                    'hourly_rate' => 35,
                    'teaching_experience' => "8 years teaching English online and in language schools in Spain and the UK. Experienced in IELTS and TOEFL preparation.",
                    'education' => "Master's in TESOL from University of Manchester\nBA in English Literature from University of Leeds",
                    'specializations' => "Business English\nIELTS Preparation\nConversation Skills\nPronunciation",
                    'teaching_certificates' => ['CELTA', 'DELTA Module 1'],
                    'is_accepting_students' => true,
                    'calendly_link' => 'https://calendly.com/sarah-teacher',
                    'video_introduction_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                ]
            ],
            [
                'name' => 'Miguel Rodriguez',
                'email' => 'miguel@example.com',
                'profile' => [
                    'bio' => "¡Hola! I'm Miguel, a native Spanish speaker from Madrid with a passion for teaching my mother tongue. I make learning Spanish fun and practical!",
                    'languages' => ['Spanish', 'English', 'Portuguese'],
                    'hourly_rate' => 30,
                    'teaching_experience' => "5 years teaching Spanish online and in language academies. Specialized in helping beginners gain confidence in speaking.",
                    'education' => "BA in Education from Universidad Complutense de Madrid\nSpanish Teaching Certification",
                    'specializations' => "Conversational Spanish\nBusiness Spanish\nSpanish for Travelers\nSpanish Literature",
                    'teaching_certificates' => ['ELE Certification', 'Instituto Cervantes Teacher Training'],
                    'is_accepting_students' => true,
                    'calendly_link' => 'https://calendly.com/miguel-spanish',
                    'video_introduction_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                ]
            ],
            [
                'name' => 'Yuki Tanaka',
                'email' => 'yuki@example.com',
                'profile' => [
                    'bio' => "こんにちは! I'm Yuki, a Japanese language teacher with experience in teaching both beginners and advanced students. I focus on practical, everyday Japanese.",
                    'languages' => ['Japanese', 'English'],
                    'hourly_rate' => 40,
                    'teaching_experience' => "6 years teaching Japanese online and at language schools in Tokyo. Experienced in JLPT preparation.",
                    'education' => "MA in Japanese Language Education from Waseda University\nBA in Linguistics from Tokyo University",
                    'specializations' => "JLPT Preparation\nBusiness Japanese\nConversational Japanese\nKanji Study",
                    'teaching_certificates' => ['Japanese Language Teaching Competency Test', 'TESOL Certificate'],
                    'is_accepting_students' => false,
                    'calendly_link' => 'https://calendly.com/yuki-sensei',
                    'video_introduction_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                ]
            ]
        ];

        foreach ($teachers as $teacherData) {
            $user = User::create([
                'name' => $teacherData['name'],
                'email' => $teacherData['email'],
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('teacher');

            TeacherProfile::create(array_merge(
                $teacherData['profile'],
                ['user_id' => $user->id]
            ));
        }

        // Create students with detailed profiles
        $students = [
            [
                'name' => 'John Smith',
                'email' => 'john@example.com',
                'profile' => [
                    'bio' => "Hi there! I'm John, a software developer looking to improve my Japanese for both business and personal interests. I love anime and Japanese culture!",
                    'learning_goals' => [
                        'Achieve JLPT N3 certification',
                        'Improve business communication',
                        'Learn to read manga in original Japanese'
                    ],
                    'languages_learning' => ['Japanese'],
                    'interests' => ['Anime', 'Manga', 'Technology', 'Japanese Culture'],
                    'current_language_level' => 'JLPT N5',
                    'preferred_lesson_duration' => '60 minutes',
                    'availability' => [
                        'Monday' => ['18:00-21:00'],
                        'Wednesday' => ['18:00-21:00'],
                        'Saturday' => ['09:00-17:00']
                    ],
                    'preferred_teaching_style' => [
                        'Conversation-focused',
                        'Visual learning',
                        'Real-world examples'
                    ],
                    'budget_per_hour' => 35.00,
                    'timezone' => 'America/New_York'
                ]
            ],
            [
                'name' => 'Maria Garcia',
                'email' => 'maria@example.com',
                'profile' => [
                    'bio' => "¡Hola! I'm Maria, a marketing professional looking to improve my English for career advancement. I'm particularly interested in business English and presentation skills.",
                    'learning_goals' => [
                        'Improve business English',
                        'Master presentation skills',
                        'Prepare for TOEFL exam'
                    ],
                    'languages_learning' => ['English'],
                    'interests' => ['Marketing', 'Business', 'Travel', 'Public Speaking'],
                    'current_language_level' => 'Intermediate (B1)',
                    'preferred_lesson_duration' => '45 minutes',
                    'availability' => [
                        'Tuesday' => ['17:00-20:00'],
                        'Thursday' => ['17:00-20:00'],
                        'Sunday' => ['10:00-15:00']
                    ],
                    'preferred_teaching_style' => [
                        'Business-focused',
                        'Role-playing',
                        'Practical exercises'
                    ],
                    'budget_per_hour' => 30.00,
                    'timezone' => 'Europe/Madrid'
                ]
            ],
            [
                'name' => 'Alex Chen',
                'email' => 'alex@example.com',
                'profile' => [
                    'bio' => "Hello! I'm Alex, a university student majoring in International Relations. I'm learning both Spanish and French to prepare for a career in diplomacy.",
                    'learning_goals' => [
                        'Achieve fluency in Spanish and French',
                        'Focus on diplomatic and formal language',
                        'Improve accent and pronunciation'
                    ],
                    'languages_learning' => ['Spanish', 'French'],
                    'interests' => ['International Relations', 'Politics', 'Culture', 'Travel'],
                    'current_language_level' => 'Beginner (A2)',
                    'preferred_lesson_duration' => '90 minutes',
                    'availability' => [
                        'Monday' => ['14:00-18:00'],
                        'Wednesday' => ['14:00-18:00'],
                        'Friday' => ['14:00-18:00']
                    ],
                    'preferred_teaching_style' => [
                        'Immersive learning',
                        'Cultural context',
                        'Grammar-focused'
                    ],
                    'budget_per_hour' => 25.00,
                    'timezone' => 'Asia/Singapore'
                ]
            ]
        ];

        foreach ($students as $studentData) {
            $user = User::create([
                'name' => $studentData['name'],
                'email' => $studentData['email'],
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('student');

            StudentProfile::create(array_merge(
                $studentData['profile'],
                ['user_id' => $user->id]
            ));
        }
    }
} 