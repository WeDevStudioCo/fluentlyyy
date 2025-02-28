<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            RoleSeeder::class,
            DummyUsersSeeder::class,
        ]);

        // Create admin user
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin1234'),
        ])->assignRole('admin');

        // Create teacher user
        \App\Models\User::factory()->create([
            'name' => 'Teacher User',
            'email' => 'teacher@teacher.com',
            'password' => bcrypt('teacher1234'),
        ])->assignRole('teacher');

        // Create student user
        \App\Models\User::factory()->create([
            'name' => 'Student User',
            'email' => 'student@student.com',
            'password' => bcrypt('student1234'),
        ])->assignRole('student');
    }
}
