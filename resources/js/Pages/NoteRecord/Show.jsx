import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import LexicalEditor from "@/Components/LexicalEditor";
import UserIcon from "@/Components/UserIcon";
import CommentForm from "@/Components/CommentForm";
import CommentList from "@/Components/CommentList";

export default function Show(props) {
    const { delete: destroy, post, processing } = useForm();
    
    const handleLike = (id) => {
        post(route("note_record.like", id));
    };

    const handleUnlike = (id) => {
        destroy(route("note_record.unlike", id));
    };
    
    const isLiked = () => props.note_record.note_record_likes.some(like => like.id === props.auth.user.id);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm("ノートを削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("note_record.destroy", id));
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
                        ノート
                    </div>
                    <button
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        一覧に戻る
                    </button>
                </div>
            }
        >
            <Head title="Note_records Show" />
            
            <div>
                <div className="sm:w-5/6 m-auto">
                    <div className="px-2 py-5 sm:p-10 bg-white shadow-sm sm:rounded-md">
                        <div className="md:flex md:justify-between items-center">
                            <div className="flex justify-between sm:justify-start items-center">
                                <UserIcon 
                                    user={props.note_record.user}
                                    linkClassName="items-center"
                                    imgClassName="w-10 h-10"
                                    name={
                                        <div className="ml-3">{props.note_record.user.name}</div>
                                    }
                                />
                                <div className="ml-5">{props.note_record.date}</div>
                            </div>
                            <div className="hidden lg:flex">
                                {isLiked() ? (
                                    <button 
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                        onClick={() => handleUnlike(props.note_record.id)}
                                        process={processing}
                                    >
                                        {props.like_count} いいね済み
                                    </button>
                                    ) : (
                                    <button 
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 hover:text-black"
                                        onClick={() => handleLike(props.note_record.id)}
                                        process={processing}
                                    >
                                        {props.like_count} いいねする
                                    </button>
                                )}
                                {props.auth.user.id === props.note_record.user.id && (
                                    <div>
                                        <Link href={route("note_record.edit", props.note_record.id)}>
                                            <button className="px-4 py-2 ml-5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                                                編集
                                            </button>
                                        </Link>
                                        <button 
                                            className="px-4 py-2 ml-5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                            onClick={() => handleDelete(props.note_record.id)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex mt-2 sm:mt-5 overflow-y-auto">
                            {props.note_record.categories.map((category) => 
                                <div className="px-2 py-1 mr-2 sm:mr-5 bg-lime-200 text-black text-sm font-bold rounded-full">
                                    {category.name}
                                </div>
                            )}
                        </div>
                        <div className="pt-5 sm:pt-10 pb-3 text-3xl font-bold break-all">
                            {props.note_record.title}
                        </div>
                        <LexicalEditor data={props.note_record.body} isEditable={false}/>
                    </div>
                </div>
            </div>
            <div className="pb-10 sm:pb-0">
                <CommentForm
                    note_record_id={props.note_record.id}
                />
                <CommentList 
                    comments={props.note_record.note_record_comments}
                    auth={props.auth}
                    note_record_id={props.note_record.id}
                />
            </div>
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 max-w-screen-2xl">
                <div className="flex justify-between p-5 m-auto bg-slate-50 border-t">
                    {props.auth.user.id === props.note_record.user.id && (
                        <div>
                            <Link href={route("note_record.edit", props.note_record.id)}>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                                編集
                                </button>
                            </Link>
                            <button 
                                className="px-4 py-2 ml-5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                onClick={() => handleDelete(props.note_record.id)}
                            >
                                削除
                            </button>
                        </div>
                    )}
                    {isLiked() ? (
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                            onClick={() => handleUnlike(props.note_record.id)}
                            process={processing}
                        >
                            {props.like_count} いいね済み
                        </button>
                        ) : (
                        <button 
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 hover:text-black"
                            onClick={() => handleLike(props.note_record.id)}
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