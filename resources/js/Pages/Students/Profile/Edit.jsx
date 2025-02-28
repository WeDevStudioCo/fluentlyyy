import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function Edit({ auth, student }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        bio: student.bio || '',
        learning_goals: student.learning_goals || [],
        languages_learning: student.languages_learning || [],
        interests: student.interests || [],
        current_language_level: student.current_language_level || '',
        preferred_lesson_duration: student.preferred_lesson_duration || '',
        availability: student.availability || {},
        preferred_teaching_style: student.preferred_teaching_style || [],
        budget_per_hour: student.budget_per_hour || '',
        timezone: student.timezone || '',
        profile_picture: student.profile_picture || '',
    });

    const [newGoal, setNewGoal] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [newStyle, setNewStyle] = useState('');

    const submit = (e) => {
        e.preventDefault();
        post(route('student.profile.update'));
    };

    const addItem = (item, list, setItem) => {
        if (item.trim()) {
            setData(list, [...data[list], item.trim()]);
            setItem('');
        }
    };

    const removeItem = (index, list) => {
        setData(list, data[list].filter((_, i) => i !== index));
    };

    const handleAvailabilityChange = (day, times) => {
        setData('availability', {
            ...data.availability,
            [day]: times.split(',').map(time => time.trim()),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Profile</h2>}
        >
            <Head title="Edit Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="bio" value="Bio" />
                                <textarea
                                    id="bio"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    rows={4}
                                />
                                <InputError message={errors.bio} className="mt-2" />
                            </div>

                            {/* Learning Goals */}
                            <div>
                                <InputLabel value="Learning Goals" />
                                <div className="mt-2 space-y-2">
                                    {data.learning_goals.map((goal, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="flex-grow">{goal}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index, 'learning_goals')}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex gap-2">
                                        <TextInput
                                            value={newGoal}
                                            onChange={e => setNewGoal(e.target.value)}
                                            placeholder="Add a learning goal"
                                            className="flex-grow"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addItem(newGoal, 'learning_goals', setNewGoal)}
                                            className="px-4 py-2 bg-gray-800 text-white rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <InputError message={errors.learning_goals} className="mt-2" />
                            </div>

                            {/* Languages Learning */}
                            <div>
                                <InputLabel value="Languages Learning" />
                                <div className="mt-2 space-y-2">
                                    {data.languages_learning.map((language, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="flex-grow">{language}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index, 'languages_learning')}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex gap-2">
                                        <TextInput
                                            value={newLanguage}
                                            onChange={e => setNewLanguage(e.target.value)}
                                            placeholder="Add a language"
                                            className="flex-grow"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addItem(newLanguage, 'languages_learning', setNewLanguage)}
                                            className="px-4 py-2 bg-gray-800 text-white rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <InputError message={errors.languages_learning} className="mt-2" />
                            </div>

                            {/* Current Language Level */}
                            <div>
                                <InputLabel htmlFor="current_language_level" value="Current Language Level" />
                                <select
                                    id="current_language_level"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.current_language_level}
                                    onChange={e => setData('current_language_level', e.target.value)}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner (A1)">Beginner (A1)</option>
                                    <option value="Elementary (A2)">Elementary (A2)</option>
                                    <option value="Intermediate (B1)">Intermediate (B1)</option>
                                    <option value="Upper Intermediate (B2)">Upper Intermediate (B2)</option>
                                    <option value="Advanced (C1)">Advanced (C1)</option>
                                    <option value="Mastery (C2)">Mastery (C2)</option>
                                </select>
                                <InputError message={errors.current_language_level} className="mt-2" />
                            </div>

                            {/* Preferred Lesson Duration */}
                            <div>
                                <InputLabel htmlFor="preferred_lesson_duration" value="Preferred Lesson Duration" />
                                <select
                                    id="preferred_lesson_duration"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.preferred_lesson_duration}
                                    onChange={e => setData('preferred_lesson_duration', e.target.value)}
                                >
                                    <option value="30 minutes">30 minutes</option>
                                    <option value="45 minutes">45 minutes</option>
                                    <option value="60 minutes">60 minutes</option>
                                    <option value="90 minutes">90 minutes</option>
                                    <option value="120 minutes">120 minutes</option>
                                </select>
                                <InputError message={errors.preferred_lesson_duration} className="mt-2" />
                            </div>

                            {/* Availability */}
                            <div>
                                <InputLabel value="Availability" />
                                <div className="mt-2 space-y-4">
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                        <div key={day}>
                                            <InputLabel htmlFor={`availability_${day}`} value={day} />
                                            <TextInput
                                                id={`availability_${day}`}
                                                className="mt-1 block w-full"
                                                value={data.availability[day]?.join(', ') || ''}
                                                onChange={e => handleAvailabilityChange(day, e.target.value)}
                                                placeholder="e.g., 09:00-12:00, 14:00-17:00"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <InputError message={errors.availability} className="mt-2" />
                            </div>

                            {/* Budget per Hour */}
                            <div>
                                <InputLabel htmlFor="budget_per_hour" value="Budget per Hour ($)" />
                                <TextInput
                                    id="budget_per_hour"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.budget_per_hour}
                                    onChange={e => setData('budget_per_hour', e.target.value)}
                                />
                                <InputError message={errors.budget_per_hour} className="mt-2" />
                            </div>

                            {/* Timezone */}
                            <div>
                                <InputLabel htmlFor="timezone" value="Timezone" />
                                <select
                                    id="timezone"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.timezone}
                                    onChange={e => setData('timezone', e.target.value)}
                                >
                                    {Intl.supportedValuesOf('timeZone').map((tz) => (
                                        <option key={tz} value={tz}>{tz}</option>
                                    ))}
                                </select>
                                <InputError message={errors.timezone} className="mt-2" />
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
        </AuthenticatedLayout>
    );
} 