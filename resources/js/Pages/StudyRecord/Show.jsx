import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import LexicalEditor from "@/Components/LexicalEditor";
import UserIcon from "@/Components/UserIcon";
import TimeFormatter from "@/Components/TimeFormatter";
import CommentForm from "@/Components/CommentForm";
import CommentList from "@/Components/CommentList";

export default function Show(props) {
    const { delete: destroy, post, processing } = useForm();
    
    const handleLike = (id) => {
        post(route("study_record.like", id));
    };

    const handleUnlike = (id) => {
        destroy(route("study_record.unlike", id));
    };
    
    const isLiked = () => props.study_record.study_record_likes.some(like => like.id === props.auth.user.id);
    
    const handleDelete = (id) => {
        const shouldDelete = window.confirm("学習記録を削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("study_record.destroy", id));
        } 
    };
    
    const handleBack = () => {
        window.history.back();
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        学習記録
                    </div>
                    <button
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </button>
                </div>
            }
        >
            <Head title="Study_records Show" />
            
            <div>
                <div className="sm:w-5/6 m-auto">
                    <div className="px-2 py-5 sm:p-10 bg-white shadow-sm sm:rounded-md">
                        <div className="md:flex md:justify-between items-center">
                            <div className="flex justify-between sm:justify-start items-center">
                                <UserIcon 
                                    user={props.study_record.user} 
                                    linkClassName="items-center"
                                    imgClassName="w-10 h-10"
                                    name={
                                        <div className="ml-3">{props.study_record.user.name}</div>
                                    }
                                />
                                <div className="ml-5">{props.study_record.date}</div>
                                <div className="hidden sm:block ml-5 text-lg font-semibold">
                                    <TimeFormatter time={props.study_record.time} />
                                </div>
                            </div>
                            <div className="hidden lg:flex">
                                {isLiked() ? (
                                    <button 
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                        onClick={() => handleUnlike(props.study_record.id)}
                                        process={processing}
                                    >
                                        {props.like_count} いいね済み
                                    </button>
                                    ) : (
                                    <button 
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 hover:text-black"
                                        onClick={() => handleLike(props.study_record.id)}
                                        process={processing}
                                    >
                                        {props.like_count} いいねする
                                    </button>
                                )}
                                {props.auth.user.id === props.study_record.user.id && (
                                    <div>
                                        <Link href={route("study_record.edit", props.study_record.id)}>
                                            <button className="px-4 py-2 ml-5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                                                編集
                                            </button>
                                        </Link>
                                        <button 
                                            className="px-4 py-2 ml-5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                            onClick={() => handleDelete(props.study_record.id)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 sm:mt-5">
                            <div className="px-2 py-1 bg-lime-200 text-black text-sm font-bold rounded-full overflow-x-auto">
                                {props.study_record.category.name}
                            </div>
                            <div className="sm:hidden text-lg font-semibold">
                                <TimeFormatter time={props.study_record.time} />
                            </div>
                        </div>
                        <div className="pt-5 sm:pt-10 pb-3 text-3xl font-bold break-all">
                            {props.study_record.title}
                        </div>
                        <LexicalEditor data={props.study_record.body} isEditable={false}/>
                    </div>
                </div>
            </div>
            <div className="pb-10 sm:pb-0">
                <CommentForm
                    study_record_id={props.study_record.id}
                />
                <CommentList 
                    comments={props.study_record.study_record_comments}
                    auth={props.auth}
                    study_record_id={props.study_record.id}
                />
            </div>
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 max-w-screen-2xl">
                <div className="flex justify-between p-5 m-auto bg-slate-50 border-t">
                    {props.auth.user.id === props.study_record.user.id && (
                        <div>
                            <Link href={route("study_record.edit", props.study_record.id)}>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                                編集
                                </button>
                            </Link>
                            <button 
                                className="px-4 py-2 ml-5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                onClick={() => handleDelete(props.study_record.id)}
                            >
                                削除
                            </button>
                        </div>
                    )}
                    {isLiked() ? (
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                            onClick={() => handleUnlike(props.study_record.id)}
                            process={processing}
                        >
                            {props.like_count} いいね済み
                        </button>
                        ) : (
                        <button 
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 hover:text-black"
                            onClick={() => handleLike(props.study_record.id)}
                            process={processing}
                        >
                            {props.like_count} いいねする
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}