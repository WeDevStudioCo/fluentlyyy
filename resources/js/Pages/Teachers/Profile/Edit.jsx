import { useState } from 'react';
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function Edit({ auth, profile, timezones }) {
    const [selectedImage, setSelectedImage] = useState(
        profile.profile_picture ? `/storage/${profile.profile_picture}` : null
    );
    
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        bio: profile.bio || '',
        education: profile.education || '',
        teaching_experience: profile.teaching_experience || '',
        specializations: profile.specializations || '',
        profile_picture: null,
        languages: profile.languages || [],
        teaching_certificates: profile.teaching_certificates || [],
        timezone: profile.timezone || '',
        hourly_rate: profile.hourly_rate || '',
        availability: profile.availability || {},
        video_introduction_url: profile.video_introduction_url || '',
        teaching_methodology: profile.teaching_methodology || [],
        is_accepting_students: profile.is_accepting_students ?? true,
        calendly_link: profile.calendly_link || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teacher.profile.update'));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setData('profile_picture', file);
        }
    };

    return (
        <TeacherLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Perfil</h2>}
        >
            <Head title="Editar Perfil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="profile_picture" value="Foto de Perfil" />
                                <input
                                    type="file"
                                    id="profile_picture"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                />
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Vista previa"
                                        className="mt-2 h-32 w-32 object-cover rounded-full border"
                                    />
                                )}
                                <InputError message={errors.profile_picture} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="bio" value="Biografía" />
                                <textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="Cuéntanos sobre ti y tu experiencia..."
                                />
                                <InputError message={errors.bio} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="education" value="Educación" />
                                <textarea
                                    id="education"
                                    value={data.education}
                                    onChange={(e) => setData('education', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="Describe tu formación académica..."
                                />
                                <InputError message={errors.education} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="teaching_experience" value="Experiencia Docente" />
                                <textarea
                                    id="teaching_experience"
                                    value={data.teaching_experience}
                                    onChange={(e) => setData('teaching_experience', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="Describe tu experiencia enseñando idiomas..."
                                />
                                <InputError message={errors.teaching_experience} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="specializations" value="Especializaciones" />
                                <textarea
                                    id="specializations"
                                    value={data.specializations}
                                    onChange={(e) => setData('specializations', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="¿En qué áreas te especializas?"
                                />
                                <InputError message={errors.specializations} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="languages" value="Idiomas que Enseñas" />
                                <select
                                    multiple
                                    id="languages"
                                    value={data.languages}
                                    onChange={(e) => setData('languages', Array.from(e.target.selectedOptions, option => option.value))}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="Inglés">Inglés</option>
                                    <option value="Español">Español</option>
                                    <option value="Francés">Francés</option>
                                    <option value="Alemán">Alemán</option>
                                    <option value="Italiano">Italiano</option>
                                    <option value="Portugués">Portugués</option>
                                    <option value="Chino">Chino</option>
                                    <option value="Japonés">Japonés</option>
                                    <option value="Coreano">Coreano</option>
                                </select>
                                <p className="mt-1 text-sm text-gray-500">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples idiomas</p>
                                <InputError message={errors.languages} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hourly_rate" value="Tarifa por Hora (USD)" />
                                <TextInput
                                    type="number"
                                    id="hourly_rate"
                                    value={data.hourly_rate}
                                    onChange={(e) => setData('hourly_rate', e.target.value)}
                                    className="mt-1 block w-full"
                                    min="0"
                                    step="0.01"
                                />
                                <InputError message={errors.hourly_rate} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="timezone" value="Zona Horaria" />
                                <select
                                    id="timezone"
                                    value={data.timezone}
                                    onChange={(e) => setData('timezone', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">Selecciona tu zona horaria</option>
                                    {timezones.map((timezone) => (
                                        <option key={timezone} value={timezone}>
                                            {timezone}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.timezone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="video_introduction_url" value="URL del Video de Presentación" />
                                <TextInput
                                    type="url"
                                    id="video_introduction_url"
                                    value={data.video_introduction_url}
                                    onChange={(e) => setData('video_introduction_url', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://www.youtube.com/..."
                                />
                                <InputError message={errors.video_introduction_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="calendly_link" value="Enlace de Calendly" />
                                <TextInput
                                    type="url"
                                    id="calendly_link"
                                    value={data.calendly_link}
                                    onChange={(e) => setData('calendly_link', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://calendly.com/tu-usuario"
                                />
                                <InputError message={errors.calendly_link} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_accepting_students"
                                    checked={data.is_accepting_students}
                                    onChange={(e) => setData('is_accepting_students', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <label htmlFor="is_accepting_students" className="ml-2 block text-sm text-gray-900">
                                    Aceptando nuevos estudiantes
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Guardar Cambios</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Guardado.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}
