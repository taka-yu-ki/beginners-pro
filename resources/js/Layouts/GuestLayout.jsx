import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="w-full sm:fixed sm:top-0 sm:right-0 flex justify-between p-6 text-right border-b-4">
                    <div className="text-left myfont-semibold text-black">Beginners Pro</div>
                    <div>
                            <Link
                                href='/'
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Topに戻る
                            </Link>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
