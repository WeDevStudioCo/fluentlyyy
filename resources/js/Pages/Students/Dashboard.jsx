import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, student, recommendedTeachers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex items-center">
                                {student.profile.profile_picture ? (
                                    <img
                                        src={`/storage/${student.profile.profile_picture}`}
                                        alt={student.name}
                                        className="h-20 w-20 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <span className="text-2xl text-indigo-600">{student.name[0]}</span>
                                    </div>
                                )}
                                <div className="ml-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Welcome back, {student.name}!</h2>
                                    <p className="text-gray-600 mt-1">
                                        Continue your language learning journey
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Learning Goals Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Learning Goals</h3>
                                <ul className="space-y-3">
                                    {student.profile.learning_goals.map((goal, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-600">{goal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Languages Learning Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Languages You're Learning</h3>
                                <div className="flex flex-wrap gap-2">
                                    {student.profile.languages_learning.map((language, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                        >
                                            {language}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Current Level: <span className="font-semibold">{student.profile.current_language_level}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Schedule</h3>
                                <div className="space-y-3">
                                    {Object.entries(student.profile.availability).map(([day, times]) => (
                                        <div key={day} className="flex items-start">
                                            <span className="font-medium text-gray-700 w-24">{day}:</span>
                                            <span className="text-gray-600">{times.join(', ')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Teachers Section */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Teachers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recommendedTeachers.map((teacher) => (
                                <div key={teacher.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center">
                                            {teacher.profile_picture ? (
                                                <img
                                                    src={`/storage/${teacher.profile_picture}`}
                                                    alt={teacher.name}
                                                    className="h-16 w-16 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xl">{teacher.name[0]}</span>
                                                </div>
                                            )}
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold">{teacher.name}</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {teacher.languages.map((language, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                                                        >
                                                            {language}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-600 line-clamp-2">{teacher.bio}</p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-gray-900">${teacher.hourly_rate}</span>
                                            <Link
                                                href={route('teachers.show', teacher.id)}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link
                                    href={route('teachers.index')}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                                >
                                    Find Teachers
                                </Link>
                                <Link
                                    href={route('student.profile.edit')}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                >
                                    View Progress
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 