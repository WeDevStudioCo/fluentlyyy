import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function TeacherDashboard({ auth, students, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [language, setLanguage] = useState(filters.language || '');

    const debouncedSearch = debounce((value, lang) => {
        router.get(
            route('teacher.dashboard'),
            { search: value, language: lang },
            { preserveState: true, preserveScroll: true }
        );
    }, 300);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value, language);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        debouncedSearch(search, e.target.value);
    };

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, []);

    return (
        <TeacherLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel del Profesor</h2>}
        >
            <Head title="Panel del Profesor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
                                    Lista de Estudiantes
                                </h3>
                                <div className="w-full flex flex-col sm:flex-row gap-4 sm:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o correo..."
                                        value={search}
                                        onChange={handleSearch}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <select
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Todos los idiomas</option>
                                        <option value="English">Inglés</option>
                                        <option value="Spanish">Español</option>
                                        <option value="Japanese">Japonés</option>
                                        <option value="French">Francés</option>
                                        <option value="German">Alemán</option>
                                        <option value="Chinese">Chino</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Correo
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Idiomas
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Presupuesto
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {students.length > 0 ? (
                                            students.map((student) => (
                                                <tr key={student.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {student.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {student.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.languages_learning && student.languages_learning.join(', ')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.budget_per_hour ? `$${student.budget_per_hour}` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link
                                                            href={route('students.show', student.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Ver Detalles
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    No se encontraron estudiantes
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}