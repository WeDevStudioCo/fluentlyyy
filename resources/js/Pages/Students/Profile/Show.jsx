import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ student }) {
    return (
        <PublicLayout>
            <Head title={`${student.name} - Language Student`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row">
                                {/* Profile Picture and Basic Info */}
                                <div className="md:w-1/3">
                                    <div className="sticky top-8">
                                        {student.profile_picture ? (
                                            <img
                                                src={`/storage/${student.profile_picture}`}
                                                alt={student.name}
                                                className="w-48 h-48 rounded-full object-cover mx-auto"
                                            />
                                        ) : (
                                            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                                <span className="text-gray-500 text-4xl">{student.name[0]}</span>
                                            </div>
                                        )}
                                        <h1 className="text-2xl font-bold text-center mt-4">{student.name}</h1>
                                        
                                        {student.languages_learning && student.languages_learning.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning</h3>
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {student.languages_learning.map((language, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                                        >
                                                            {language}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="mt-6 text-center">
                                            <p className="text-gray-600">
                                                Level: <span className="font-semibold">{student.current_language_level}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Preferred Duration: <span className="font-semibold">{student.preferred_lesson_duration}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Budget: <span className="font-semibold">${student.budget_per_hour}/hour</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="md:w-2/3 mt-8 md:mt-0 md:pl-12">
                                    {student.bio && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{student.bio}</p>
                                        </section>
                                    )}

                                    {student.learning_goals && student.learning_goals.length > 0 && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Learning Goals</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {student.learning_goals.map((goal, index) => (
                                                    <li key={index} className="text-gray-600">{goal}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {student.interests && student.interests.length > 0 && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Interests</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {student.interests.map((interest, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                                    >
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {student.preferred_teaching_style && student.preferred_teaching_style.length > 0 && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Preferred Teaching Style</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {student.preferred_teaching_style.map((style, index) => (
                                                    <li key={index} className="text-gray-600">{style}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {student.availability && Object.keys(student.availability).length > 0 && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Availability</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {Object.entries(student.availability).map(([day, times]) => (
                                                    <div key={day} className="flex flex-col">
                                                        <span className="font-semibold text-gray-700">{day}</span>
                                                        <span className="text-gray-600">{times.join(', ')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
} 