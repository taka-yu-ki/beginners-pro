import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import UserIcon from "@/Components/UserIcon";

export default function IndexFollowers(props) {
    const { delete: destroy, post, processing } = useForm();

    const handleFollow = (id) => {
        post(route("user.follow", id));
    };

    const handleUnfollow = (id) => {
        destroy(route("user.unfollow", id));
    };
    
    const isfollowed = (id) => props.my_following_ids.includes(id);
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        フォロワー
                    </div>
                    <Link
                        href={route("user.show", props.user_id)}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </Link>
                </div>
            }
        >
            <Head title="User Follower" />
            <div>
                <div className="sm:w-5/6 px-2 py-10 m-auto bg-gray-200 sm:rounded-md">
                    <div className="text-center">一覧</div>
                    <div className="border-y border-gray-500 overflow-y-auto max-h-[500px]">
                        {props.followers.map((user) => (
                            <div className="flex relative p-5 items-center bg-white hover:bg-slate-50">
                                <Link 
                                    href={route("user.show", user.id)}
                                    key={user.id} 
                                    className="absolute inset-0"
                                >
                                </Link>
                                <UserIcon user={user} linkClassName="mr-3" imgClassName="w-12 h-12" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div className="text-center">{user.name}</div>
                                        {user.id !== props.auth.user.id && (
                                            (isfollowed(user.id) ? ( 
                                                <PrimaryButton 
                                                    onClick={() => handleUnfollow(user.id)} 
                                                    processing={processing}
                                                    className="z-10"
                                                >
                                                    フォローを外す
                                                </PrimaryButton>
                                            ) : (
                                                <PrimaryButton 
                                                    onClick={() => handleFollow(user.id)} 
                                                    processing={processing}
                                                    className="z-10"
                                                >
                                                    フォローする
                                                </PrimaryButton>
                                            ))
                                        )}
                                    </div>
                                    {user.text && <div className="pt-1 whitespace-pre-wrap max-h-14 truncate">{user.text}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}