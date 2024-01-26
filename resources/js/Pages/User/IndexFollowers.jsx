import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function IndexFollowers(props) {
    const { delete: destroy, post, processing, errors } = useForm();

    const handleFollow = async (id) => {
        await post(route("user.follow", id));
    };

    const handleUnfollow = async (id) => {
        await destroy(route("user.unfollow", id));
    }
    
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
            {console.log(props.my_following_ids)}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        {props.followers.map((user) => (
                            <div key={user.id} className="flex p-5 items-center bg-slate-100 border">
                                <div className="mr-3">
                                    <img
                                        className="w-12 h-12 rounded-full ring-2 ring-white"
                                        src={ user.image_url ? user.image_url : '/images/user_icon.png'}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-auto">
                                    <div className="flex justify-between items-center">
                                        <div className="text-center">{user.name}</div>
                                        {isfollowed(user.id) ? ( 
                                            <PrimaryButton onClick={() => handleUnfollow(user.id)} processing={processing}>フォローを外す</PrimaryButton>
                                        ) : (
                                            <PrimaryButton onClick={() => handleFollow(user.id)} processing={processing}>フォローする</PrimaryButton>
                                        )}
                                    </div>
                                    <div className="pt-1">{user.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}