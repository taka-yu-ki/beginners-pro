import { Link, usePage } from "@inertiajs/react";

export default function Guest({ children }) {
    const { flash } = usePage().props;
    
    return (
        <div className="min-h-screen max-w-screen-2xl flex flex-col sm:justify-center items-center pt-[104px] sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="fixed top-0 left-0 right-0 z-40 max-w-screen-2xl">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white border-b">
                        <div className="flex justify-between items-center h-16">
                            <div className="font-bold text-black">
                                Beginners Pro
                            </div>
                            <div>
                                    <Link
                                        href="/"
                                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Topに戻る
                                    </Link>
                            </div>
                        </div>
                    </div>

                    {flash.success && (
                        <div className="py-2 sm:py-3 text-center bg-green-300 text-green-700 border-y border-green-500">
                            {flash.success}
                        </div>
                    )}
                    
                    {flash.error && (
                        <div className="py-2 sm:py-3 text-center bg-red-300 text-red-700 border-y border-red-500">
                            {flash.error}
                        </div>
                    )}

                </div>
                {children}
            </div>
        </div>
    );
}
