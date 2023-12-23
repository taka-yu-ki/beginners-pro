import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show(props) {
    const { data, setData, delete: destroy, post, processing, errors } = useForm({
        comment: ''
    });
    
    const handleDelete = (id) => {
        destroy(route("note_record.destroy", id));
    };

    const submit = async (e) => {
        e.preventDefault();
        await post(route('note_record.comment.store',{ note_record: props.note_record.id }));
    };
    
    const handleCommentDelete = async (note_record, comment) => {
        await destroy(route("note_record.comment.destroy", { note_record: note_record, comment: comment }));
    };
    
    const handleLike = async (id) => {
        await post(route("note_record.like", id));
    };

    const handleUnlike = async (id) => {
        await destroy(route("note_record.unlike", id));
    }
    
    const isLiked = () => props.note_record.note_record_likes.some(like => like.id === props.auth.user.id);
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                noteRecords
            </h2>
            }
        >
            <Head title="note_records Show" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link href={route("user.show", props.note_record.user_id)} className="item-center">
                                <img
                                    className="inline w-8 h-8 rounded-full ring-2 ring-slate-100"
                                    src={props.note_record.user.image_url ? props.note_record.user.image_url : '/images/user_icon.png'}
                                    alt=""
                                />
                                <div className="inline px-3">{props.note_record.user.name}</div>
                            </Link>
                            <div>{props.note_record.categories.map((category) => category.name)}</div>
                            <div>{props.note_record.date}</div>
                            <div>{props.note_record.title}</div>
                            <div>{props.note_record.body}</div>
                        </div>          
                    </div>
                    <div className="flex space-between">
                        {isLiked() ? (
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                onClick={() => handleUnlike(props.note_record.id)}
                            >
                                {props.like_count} いいね済み
                            </button>
                            ) : (
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                onClick={() => handleLike(props.note_record.id)}
                            >
                                {props.like_count} いいねする
                            </button>
                        )}
                        {props.auth.user.id === props.note_record.user.id && (
                            <div>
                                <Link href={route('note_record.edit', props.note_record.id)}>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                        更新
                                    </button>
                                </Link>
                                <button 
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                    onClick={() => handleDelete(props.note_record.id)}
                                >
                                    削除
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-5">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="comment" value="コメント" />
                                
                            <textarea
                                id="comment"
                                name="comment"
                                value={data.comment}
                                className="mt-1 block w-full"
                                onChange={(e) => setData(e.target.name, e.target.value)}
                            />
                                
                            <InputError message={errors.comment} className="mt-2" />
                        </div>
                        <div className="flex justify-end mt-4">
                            <PrimaryButton type="submit" className="ml-4" processing={processing}>
                                コメントする
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    { props.note_record.note_record_comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((note_record_comment) => { return (
                        <div className="border-t border-slate-300 p-3 flex">
                            <img
                                className="flex-none inline-block w-8 h-8 rounded-full ring-2 ring-white"
                                src={ note_record_comment.user.image_url ? note_record_comment.user.image_url : '/images/user_icon.png'}
                                alt=""
                            />
                            <div className="flex-auto px-3 py-1">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="mr-5">{note_record_comment.user.name}</div>
                                        <div>{note_record_comment.created_at}</div>
                                    </div>
                                    { note_record_comment.user.id === props.auth.user.id && (
                                        <div>
                                          <Link className="underline" onClick={() => handleCommentDelete(props.note_record.id, note_record_comment.id)}>
                                            削除する
                                          </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="py-5">
                                    <p>{note_record_comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ); })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}