import { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";

export default function Authenticated({ auth, header, children, className }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen max-w-screen-2xl bg-gray-100 relative">
            <div className="fixed top-0 inset-x-0 z-40 max-w-screen-2xl">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <div className="font-bold text-black">Beginners Pro</div>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <UserIcon user={auth.user} linkClassName="mr-5" imgClassName="w-10 h-10" />
                            <div className="-mr-2 flex items-center">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? "inline-flex" : "hidden"}
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

                <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:max-w-7xl sm:mx-auto sm:px-4 sm:hidden"}>
                    <div className="pt-4 pb-1 bg-gray-100 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("study_record.index")}>
                                学習記録
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("note_record.index")}>
                                ノート
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("category.index")}>
                                カテゴリー
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("profile.edit")}>
                                プロフィール
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
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

            <div className={(showingNavigationDropdown ? "sm:block" : "hidden") + " hidden fixed inset-y-0 right-0 z-50 max-w-screen-2xl w-1/4"}>
                    <div className="h-full bg-white border-t border-gray-200 border-l border-gray-100">
                        <div className="flex justify-end h-16 px-4 sm:px-6 lg:px-8">
                            <div className="-mr-2 flex items-center">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? "inline-flex" : "hidden"}
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
                            <ResponsiveNavLink href={route("study_record.index")}>
                                学習記録
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("note_record.index")}>
                                ノート
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("category.index")}>
                                カテゴリー
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("profile.edit")}>
                                プロフィール
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                ログアウト
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>

            <main className="pt-[184px] sm:pt-56 pb-10 sm:pb-20 space-y-10 sm:space-y-20">{children}</main>
        </div>
    );
}
