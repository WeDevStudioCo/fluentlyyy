import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="flex md:w-1/2 flex justify-center">

                <Link href="/">
                    <ApplicationLogo className="w-60 h-60" />
                </Link>

            </div>

            <div className="flex items-center md:w-1/2 w-full h-[100vh] px-6 py-4 bg-indigo-100 overflow-hidden shadow-xl">
                {children}
            </div>
        </div>
    );
}
