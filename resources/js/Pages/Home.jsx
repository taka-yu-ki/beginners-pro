import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-gray-100 relative">
                <div className="fixed top-0 left-0 right-0 z-10">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white border-b">
                        <div className="flex justify-between items-center h-16">
                            <div className="font-bold text-black">
                                Beginners Pro
                            </div>
                            <div>
                                {props.auth.user ? (
                                    <Link
                                        href={route('study_record.index')}
                                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        記録をする
                                    </Link>
                                ) : (
                                    <div>
                                        <Link
                                            href={route('login')}
                                            className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            ログイン
                                        </Link>
                
                                        <Link
                                            href={route('register')}
                                            className="ml-4 font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            新規登録
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-72 pb-56 text-center">
                    <div className="text-6xl font-bold">Beginners Pro</div>
                    <div className="pt-10 text-sm">プログラミング初学者がプロフェッショナルになるための学習記録アプリケーションです。</div>
                </div>
                <div className="h-48 p-6 bg-white text-left border-t">
                    <p className="mr-5 mb-5">© 2023 muranakatakayuki</p>
                    <Link className="mr-5">About</Link>
                    <Link className="mr-5">サイトマップ</Link>
                    <Link className="mr-5">プライバシーポリシー</Link>
                </div>
            </div>
        </>
    );
}
