import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head } from "@inertiajs/react";

export default function TeacherDashboard({ auth }) {

    return (
        <TeacherLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Dashboard</h2>}
        >
            <Head title="Teacher Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in as a professor!</div>
                        <p>
                        {auth.user.role === 'teacher' && (
                            <span> You can access the dashboard and the teacher's dashboard.</span>
                        )}
                        </p>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}