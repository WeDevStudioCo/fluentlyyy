import { useState } from 'react';
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function Edit({ auth, profile, timezones }) {
    const [selectedImage, setSelectedImage] = useState(null);
    
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Profile</h2>}
        >
            <Head title="Edit Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="profile_picture" value="Profile Picture" />
                                <input
                                    type="file"
                                    id="profile_picture"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1"
                                />
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 object-cover rounded-full"
                                    />
                                )}
                                <InputError message={errors.profile_picture} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="bio" value="Bio" />
                                <textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                />
                                <InputError message={errors.bio} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="education" value="Education" />
                                <textarea
                                    id="education"
                                    value={data.education}
                                    onChange={(e) => setData('education', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                />
                                <InputError message={errors.education} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="teaching_experience" value="Teaching Experience" />
                                <textarea
                                    id="teaching_experience"
                                    value={data.teaching_experience}
                                    onChange={(e) => setData('teaching_experience', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                />
                                <InputError message={errors.teaching_experience} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="specializations" value="Specializations" />
                                <textarea
                                    id="specializations"
                                    value={data.specializations}
                                    onChange={(e) => setData('specializations', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                />
                                <InputError message={errors.specializations} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hourly_rate" value="Hourly Rate ($)" />
                                <TextInput
                                    id="hourly_rate"
                                    type="number"
                                    step="0.01"
                                    value={data.hourly_rate}
                                    onChange={(e) => setData('hourly_rate', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.hourly_rate} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="timezone" value="Timezone" />
                                <select
                                    id="timezone"
                                    value={data.timezone}
                                    onChange={(e) => setData('timezone', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">Select a timezone</option>
                                    {timezones.map((timezone) => (
                                        <option key={timezone} value={timezone}>
                                            {timezone}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.timezone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="video_introduction_url" value="Video Introduction URL" />
                                <TextInput
                                    id="video_introduction_url"
                                    type="url"
                                    value={data.video_introduction_url}
                                    onChange={(e) => setData('video_introduction_url', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://youtube.com/..."
                                />
                                <InputError message={errors.video_introduction_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="calendly_link" value="Calendly Booking Link" />
                                <TextInput
                                    id="calendly_link"
                                    type="url"
                                    value={data.calendly_link}
                                    onChange={(e) => setData('calendly_link', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://calendly.com/yourname"
                                />
                                <InputError message={errors.calendly_link} className="mt-2" />
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_accepting_students}
                                        onChange={(e) => setData('is_accepting_students', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Currently accepting new students</span>
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
} 