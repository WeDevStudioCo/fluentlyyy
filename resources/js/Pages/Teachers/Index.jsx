import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index({ teachers, filters }) {
    const { data, setData, get } = useForm({
        language: filters.language || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        show_all: filters.show_all || false,
    });

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setData(name, newValue);
        get(route('teachers.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Find Language Teachers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Language</label>
                                <select
                                    name="language"
                                    value={data.language}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Languages</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Chinese">Chinese</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Min Price</label>
                                <input
                                    type="number"
                                    name="min_price"
                                    value={data.min_price}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Max Price</label>
                                <input
                                    type="number"
                                    name="max_price"
                                    value={data.max_price}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    min="0"
                                />
                            </div>
                            <div className="flex items-center mt-7">
                                <input
                                    type="checkbox"
                                    name="show_all"
                                    checked={data.show_all}
                                    onChange={handleFilterChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Show all teachers
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Teachers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teachers.data.map((teacher) => (
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
                                            <h3 className="text-lg font-semibold">{teacher.name}</h3>
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
                                        <p className="text-gray-600 line-clamp-3">{teacher.bio}</p>
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

                                    {!teacher.is_accepting_students && (
                                        <div className="mt-4">
                                            <p className="text-red-500 text-sm">Not accepting new students</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {teachers.links && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {teachers.prev_page_url && (
                                        <Link
                                            href={teachers.prev_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {teachers.next_page_url && (
                                        <Link
                                            href={teachers.next_page_url}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
} 