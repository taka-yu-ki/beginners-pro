import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { Head, Link, useForm, useRemember } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LexicalEditor from "@/Components/LexicalEditor";
import UserIcon from "@/Components/UserIcon";
import TimeFormatter from "@/Components/TimeFormatter";

export default function Show(props) {
    const { data, setData, delete: destroy, post, processing, errors, reset } = useForm({
        comment: "",
    });
    
    const [textLength, setTextLength] = useRemember(0);
    const maxTextLength = 50;
    
    useEffect(() => {
        setTextLength(data.comment.length);
    }, [data.comment]);
    
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route("study_record.comment.store",{ study_record: props.study_record.id }), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };
    
    const handleCommentDelete = (study_record, comment) => {
        const shouldDelete = window.confirm("コメントを削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("study_record.comment.destroy", { study_record: study_record, comment: comment }), {
                preserveScroll: true,
            });
        }
    };
    
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
                    <Link
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </Link>
                </div>
            }
        >
            <Head title="Study_records Show" />
            <div className="pt-20 pb-10">
                <div className="w-5/6 m-auto">
                    <div className="p-10 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <UserIcon 
                                    user={props.study_record.user} 
                                    imgClassName="w-10 h-10"
                                    name={
                                        <div className="ml-3">{props.study_record.user.name}</div>
                                    }
                                />
                                <div className="ml-5">{props.study_record.date}</div>
                                <div className="px-2 py-1 ml-5 bg-lime-200 text-black text-sm rounded-full">{props.study_record.category.name}</div>
                                <div className="ml-5 font-semibold">
                                    <TimeFormatter time={props.study_record.time} />
                                </div>
                            </div>
                            <div className="flex">
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
                        <div className="pt-10 pb-3 text-3xl font-bold">
                            {props.study_record.title}
                        </div>
                        <LexicalEditor data={props.study_record.body} isEditable={false}/>
                    </div>
                </div>
            </div>
            <div className="pb-20">
                <div className="w-5/6 mb-5 m-auto">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <InputLabel htmlFor="comment" value="コメント" />
                                <div>{textLength} / {maxTextLength}</div>
                            </div>
                            <textarea
                                id="comment"
                                name="comment"
                                value={data.comment}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
                                maxlength={maxTextLength}
                            />
                                
                            <InputError message={errors.comment} className="mt-2" />
                        </div>
                        <div className="flex justify-end mt-4">
                            <PrimaryButton processing={processing}>
                                コメントする
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <div className="w-5/6 m-auto">
                    { props.study_record.study_record_comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((study_record_comment) => { return (
                        <div className="border-t border-slate-300 p-3 flex">
                            <div className="flex-none inline-block">
                                <UserIcon user={study_record_comment.user} imgClassName="w-8 h-8"/>
                            </div>
                            <div className="flex-auto px-3 py-1">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <Link 
                                            href={route("user.show", study_record_comment.user.id)}
                                            className="mr-5"
                                        >
                                            {study_record_comment.user.name}
                                        </Link>
                                        <div>{study_record_comment.created_at}</div>
                                    </div>
                                    { study_record_comment.user.id === props.auth.user.id && (
                                        <button 
                                            className="underline" 
                                            onClick={() => handleCommentDelete(props.study_record.id, study_record_comment.id)}
                                            process={processing} 
                                        >
                                            削除する
                                        </button>
                                    )}
                                </div>
                                <div className="py-5 whitespace-pre-wrap">
                                    {study_record_comment.comment}
                                </div>
                            </div>
                        </div>
                    ); })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}