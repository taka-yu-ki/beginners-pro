import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="w-full sm:fixed sm:top-0 sm:right-0 flex justify-between p-6 border-b-4">
                    <div className="myfont-semibold text-black">Beginners Pro</div>
                    <div>
                        {props.auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Login
                                </Link>
    
                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="home">
                    <div className="home-content">
                        <h1 className="text-6xl text-center font-bold p-10">Beginners Pro</h1>
                        <p className="text-sm">プログラミング初学者がプロフェッショナルになるための学習記録アプリケーションです。</p>
                    </div>
                </div>
                <div className="w-full h-40 flex sm:fixed sm:bottom-0 sm:right-0 p-6 text-left border-t-4">
                    <p className="mr-5">© 2023 muranakatakayuki</p>
                    <Link className="mr-5">About</Link>
                    <Link className="mr-5">サイトマップ</Link>
                    <Link className="mr-5">プライバシーポリシー</Link>
                </div>
            </div>
        </>
    );
}
