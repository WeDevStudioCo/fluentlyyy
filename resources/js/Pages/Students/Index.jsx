import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index({ students }) {
    return (
        <PublicLayout>
            <Head title="Encuentra Estudiantes de Idiomas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Encuentra Estudiantes de Idiomas</h1>
                        <p className="mt-2 text-gray-600">Conéctate con estudiantes que buscan aprender nuevos idiomas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {students.map((student) => (
                            <Link
                                key={student.id}
                                href={route('students.show', student.id)}
                                className="block bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg"
                            >
                                <div className="p-6">
                                    <div className="flex items-center space-x-4">
                                        {student.profile_picture ? (
                                            <img
                                                src={`/storage/${student.profile_picture}`}
                                                alt={student.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500 text-xl">{student.name[0]}</span>
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                                            <p className="text-sm text-gray-600">{student.current_language_level}</p>
                                        </div>
                                    </div>

                                    {student.languages_learning && student.languages_learning.length > 0 && (
                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {student.languages_learning.map((language, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                                    >
                                                        {language}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {student.bio && (
                                        <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                                            {student.bio}
                                        </p>
                                    )}

                                    <div className="mt-4 flex justify-between items-center text-sm">
                                        <span className="text-gray-600">
                                            {student.preferred_lesson_duration}
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ${student.budget_per_hour}/hora
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
} 