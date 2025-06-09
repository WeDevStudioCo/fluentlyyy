import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Show({ teacher }) {
    return (
        <PublicLayout>
            <Head title={`${teacher.name} - Profesor de Idiomas`} />

            <div className="max-w-4xl mx-auto py-12">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="relative">
                        <div className="h-32 rounded-t-lg bg-gradient-to-r from-indigo-600 to-purple-500" />
                        <div className="px-6 -mt-16 flex flex-col items-center text-center">
                            {teacher.profile_picture ? (
                                <img
                                    src={`/storage/${teacher.profile_picture}`}
                                    alt={teacher.name}
                                    className="h-32 w-32 rounded-full object-cover border-4 border-white"
                                />
                            ) : (
                                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
                                    <span className="text-gray-500 text-4xl">{teacher.name[0]}</span>
                                </div>
                            )}
                            <h1 className="mt-4 text-3xl font-bold text-gray-900">{teacher.name}</h1>
                            {teacher.languages && teacher.languages.length > 0 && (
                                <div className="mt-2 flex flex-wrap justify-center gap-2">
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
                        </div>
                    </div>

                    <div className="p-6">
                        {teacher.hourly_rate && (
                            <div className="mb-6 text-center">
                                <p className="text-lg font-semibold text-gray-600">Tarifa por Hora</p>
                                <p className="text-3xl font-bold text-indigo-600">${teacher.hourly_rate}</p>
                            </div>
                        )}

                        {!teacher.is_accepting_students && (
                            <div className="mb-6 p-2 bg-red-100 text-red-700 rounded-md text-center">
                                No acepta nuevos estudiantes
                            </div>
                        )}

                        {teacher.calendly_link && teacher.is_accepting_students && (
                            <div className="mb-6 text-center">
                                <a
                                    href={teacher.calendly_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Reservar Clase
                                </a>
                            </div>
                        )}

                        {teacher.bio && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Sobre Mí</h2>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{teacher.bio}</p>
                            </section>
                        )}

                        {teacher.teaching_experience && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Experiencia Docente</h2>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {teacher.teaching_experience}
                                </p>
                            </section>
                        )}

                        {teacher.education && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Educación</h2>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{teacher.education}</p>
                            </section>
                        )}

                        {teacher.specializations && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Especializaciones</h2>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {teacher.specializations}
                                </p>
                            </section>
                        )}

                        {teacher.teaching_certificates && teacher.teaching_certificates.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Certificados</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    {teacher.teaching_certificates.map((certificate, index) => (
                                        <li key={index} className="text-gray-600">
                                            {certificate}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {teacher.video_introduction_url && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-4">Video de Presentación</h2>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={teacher.video_introduction_url}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-lg"
                                    ></iframe>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

