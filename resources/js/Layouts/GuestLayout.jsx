import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="flex w-full md:w-1/2 justify-center">

                <Link href="/">
                    <ApplicationLogo className="w-60 h-60" />
                </Link>

            </div>

            <div className="block md:flex md:items-center w-full md:w-1/2 h-[70vh] md:h-[100vh] px-6 py-20 bg-indigo-100 overflow-hidden shadow-xl">
                {children}
            </div>
        </div>
    );
}
