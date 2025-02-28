import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Show({ teacher }) {
    console.log(teacher);
    return (
        <PublicLayout>
            <Head title={`${teacher.name} - Language Teacher`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row">
                                {/* Profile Picture and Basic Info */}
                                <div className="md:w-1/3">
                                    <div className="sticky top-8">
                                        {teacher.profile_picture ? (
                                            <img
                                                src={`/storage/${teacher.profile_picture}`}
                                                alt={teacher.name}
                                                className="w-48 h-48 rounded-full object-cover mx-auto"
                                            />
                                        ) : (
                                            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                                <span className="text-gray-500 text-4xl">{teacher.name[0]}</span>
                                            </div>
                                        )}
                                        <h1 className="text-2xl font-bold text-center mt-4">{teacher.name}</h1>
                                        
                                        {teacher.languages && teacher.languages.length > 0 && (
                                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                {teacher.languages.map((language, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                                    >
                                                        {language}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {teacher.hourly_rate && (
                                            <div className="mt-6 text-center">
                                                <span className="text-3xl font-bold text-gray-900">${teacher.hourly_rate}</span>
                                                <span className="text-gray-500">/hour</span>
                                            </div>
                                        )}
                                        
                                        {!teacher.is_accepting_students && (
                                            <p className="mt-4 text-center text-red-500 bg-red-50 py-2 px-4 rounded-md">
                                                Not accepting new students
                                            </p>
                                        )}
                                        
                                        {teacher.calendly_link && teacher.is_accepting_students && (
                                            <div className="mt-6">
                                                <a
                                                    href={teacher.calendly_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-center px-4 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Schedule Trial Lesson
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="md:w-2/3 mt-8 md:mt-0 md:pl-12">
                                    {teacher.bio && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{teacher.bio}</p>
                                        </section>
                                    )}

                                    {teacher.teaching_experience && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Teaching Experience</h2>
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                                {teacher.teaching_experience}
                                            </p>
                                        </section>
                                    )}

                                    {teacher.education && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Education</h2>
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{teacher.education}</p>
                                        </section>
                                    )}

                                    {teacher.specializations && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Specializations</h2>
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                                {teacher.specializations}
                                            </p>
                                        </section>
                                    )}

                                    {teacher.teaching_certificates && teacher.teaching_certificates.length > 0 && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
                                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                                {teacher.teaching_certificates.map((cert, index) => (
                                                    <li key={index} className="leading-relaxed">{cert}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {teacher.video_introduction_url && (
                                        <section className="mb-12">
                                            <h2 className="text-2xl font-semibold mb-4">Video Introduction</h2>
                                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                                <iframe
                                                    src={teacher.video_introduction_url}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="w-full h-[400px] rounded-lg"
                                                ></iframe>
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