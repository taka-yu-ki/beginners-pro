import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { Head, Link, useForm, useRemember } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LexicalEditor from "@/Components/LexicalEditor";
import UserIcon from "@/Components/UserIcon";

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
        post(route("note_record.comment.store",{ note_record: props.note_record.id }), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };
    
    const handleCommentDelete = (note_record, comment) => {
        const shouldDelete = window.confirm("コメントを削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("note_record.comment.destroy", { note_record: note_record, comment: comment }), {
                preserveScroll: true,
            });
        }
    };

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
                    <Link
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        一覧に戻る
                    </Link>
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
                <div className="px-2 sm:px-0 sm:w-5/6 mb-5 m-auto">
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
                                className="block w-full mt-1"
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
                {props.note_record.note_record_comments.length > 0 && (
                    <div className="sm:w-5/6 max-h-[500px] px-2 sm:px-0 m-auto border-y border-slate-400 overflow-y-auto">
                        {props.note_record.note_record_comments.map((note_record_comment) => { return (
                            <div className="border-b border-slate-300 p-3 flex">
                                <div className="flex-none">
                                    <UserIcon user={note_record_comment.user} imgClassName="w-8 h-8"/>
                                </div>
                                <div className="flex-auto px-3 py-1">
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <Link 
                                                href={route("user.show", note_record_comment.user.id)}
                                                className="mr-5"
                                            >
                                                {note_record_comment.user.name}
                                            </Link>
                                            <div className="hidden sm:block">{note_record_comment.created_at}</div>
                                        </div>
                                        {note_record_comment.user.id === props.auth.user.id && (
                                            <button 
                                                className="underline" 
                                                onClick={() => handleCommentDelete(props.note_record.id, note_record_comment.id)}
                                                process={processing} 
                                            >
                                                削除する
                                            </button>
                                        )}
                                    </div>
                                    <div className="py-5 whitespace-pre-wrap break-all">
                                        {note_record_comment.comment}
                                    </div>
                                    <div className="flex sm:hidden justify-end">
                                        {note_record_comment.created_at}
                                    </div>
                                </div>
                            </div>
                        ); })}
                    </div>
                )}
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