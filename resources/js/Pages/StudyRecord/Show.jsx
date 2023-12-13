import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show(props) {
    const { delete: destroy, post } = useForm();
    
    const handleDelete = (id) => {
        destroy(route("study_record.destroy", id));
    };
    
    const handleLike = async (id) => {
        await post(route("study_record.likes.store", id));
    };

    const handleUnlike = async (id) => {
        await destroy(route("study_record.likes.destroy", id));
    }
    
    const isliked = () => props.study_record.study_record_likes.some(like => like.user_id === props.auth.user.id);
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                StudyRecords
            </h2>
            }
        >
            <Head title="Study_records Show" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>{props.study_record.user.name}</div>
                            <div>{props.study_record.categories.map((category) => category.name)}</div>
                            <div>{props.study_record.date}</div>
                            <div>{props.study_record.time}</div>
                            <div>{props.study_record.title}</div>
                            <div>{props.study_record.body}</div>
                        </div>          
                    </div>
                    {isliked() ? (
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                            onClick={() => handleUnlike(props.study_record.id)}
                        >
                            {props.study_record.study_record_likes.length} いいね済み
                        </button>
                        ) : (
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                            onClick={() => handleLike(props.study_record.id)}
                        >
                            {props.study_record.study_record_likes.length} いいねする
                        </button>
                    )}
                    <Link href={route('study_record.edit', props.study_record.id)}>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                            更新
                        </button>
                    </Link>
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                        onClick={() => handleDelete(props.study_record.id)}
                    >
                        削除
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}