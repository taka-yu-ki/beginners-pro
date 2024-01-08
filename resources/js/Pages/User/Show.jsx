import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show(props) {
    const { delete: destroy, post, processing, errors } = useForm();
    
    const handleFollow = async (id) => {
        await post(route("user.follow", id));
    };

    const handleUnfollow = async (id) => {
        await destroy(route("user.unfollow", id));
    }
    
    const isfollowed = () => props.user.followers.some(follower => follower.id === props.auth.user.id);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                User
            </h2>
            }
        >
            <Head title="User Show" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="flex items-center p-10 border-b ">
                            <img
                                className="relative w-16 h-16 rounded-full ring-2 ring-slate-100"
                                src={props.user.image_url ? props.user.image_url : '/images/user_icon.png'}
                                alt=""
                            />
                            <div className="flex-auto ml-5 text-2xl">{props.user.name}</div>
                            {isfollowed() ? ( 
                                <PrimaryButton onClick={() => handleUnfollow(props.user.id)}>フォローを外す</PrimaryButton>
                            ) : (
                                <PrimaryButton onClick={() => handleFollow(props.user.id)}>フォローする</PrimaryButton>
                            )}
                        </div>
                        <div className="flex justify-evenly">
                            <Link href={route("user.followings.index", props.user.id)}>{props.following_count} Followings</Link>
                            <Link href={route("user.followers.index", props.user.id)}>{props.follower_count} Followers</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="w-5/6 m-auto p-10 bg-slate-50 rounded-lg">
                    <div className="text-center">タイムライン</div>
                    <div className="p-6 bg-white border-t border-gray-200 overflow-y-auto" style={{ maxHeight: '500px' }}>
                        {props.user.study_records.map((study_record) => { return (
                            <Link key={study_record.id} href={route("study_record.show", study_record.id)}>
                                <div className="bg-red-500 m-5 sm:rounded-lg">
                                    <div className="flex place-items-center text-white text-sm font-bold pt-3 px-3">
                                        <Link href={route("user.show", props.user.id)}>
                                            <img
                                                className="relative w-8 h-8 rounded-full ring-2 ring-white"
                                                src={props.user.image_url ? props.user.image_url : '/images/user_icon.png'}
                                                alt=""
                                            />
                                        </Link>
                                        <div className="mx-2">{props.user.name}</div>
                                        <div className="mx-2">{study_record.date}</div>
                                        <div className="bg-lime-300 text-black rounded-full px-2 py-1 mx-2">{study_record.category.name}</div>
                                    </div>
                                    <div className="pt-1 pb-5 flex justify-evenly">
                                        <div className="text-white text-lg font-bold text-center">時間：{study_record.time}分</div>
                                        <div className="text-white text-lg font-bold text-center">{study_record.title}</div>
                                    </div>
                                </div>
                            </Link>
                        ); })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}