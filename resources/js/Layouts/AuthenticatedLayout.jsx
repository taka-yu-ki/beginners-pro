import { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <div className="fixed top-0 left-0 right-0 z-10">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <div className="font-bold text-black">Beginners Pro</div>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href={route("user.show", auth.user.id)} className="mr-5">
                                <img
                                    className="w-10 h-10 rounded-full ring-2 ring-gray-50"
                                    src={auth.user.image_url ? auth.user.image_url : '/images/user_icon.png'}
                                    alt=""
                                />
                            </Link>
                            <div className="-mr-2 flex items-center">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:max-w-7xl sm:mx-auto sm:px-4 sm:hidden'}>
                    <div className="pt-4 pb-1 bg-gray-100 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('study_record.index')}>
                                学習記録
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('note_record.index')}>
                                ノート
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("category.index")}>
                                カテゴリー
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')}>
                                プロフィール
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                ログアウト
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
            
                <div className={(showingNavigationDropdown ? 'sm:block' : 'hidden') + ' hidden w-full h-full'}>
                    <div className="bg-white border-t border-gray-200 fixed inset-y-0 right-0 z-20 w-1/4 border-l border-gray-100">
                        <div className="flex justify-end h-16 px-4 sm:px-6 lg:px-8">
                            <div className="-mr-2 flex items-center">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('study_record.index')}>
                                学習記録
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('note_record.index')}>
                                ノート
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("category.index")}>
                                カテゴリー
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')}>
                                プロフィール
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                ログアウト
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>

            <main className="pt-40">{children}</main>
        </div>
    );
}
