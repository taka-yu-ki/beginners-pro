import { Link, useForm } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";

export default function CommentList({comments, auth, study_record_id, note_record_id}) {
    const { delete: destroy, processing } = useForm();
    
    const handleStudyRecordCommentDelete = (study_record_id, comment) => {
        const shouldDelete = window.confirm("コメントを削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("study_record.comment.destroy", { study_record: study_record_id, comment: comment }), {
                preserveScroll: true,
            });
        }
    };
    
    const handleNoteRecordCommentDelete = (note_record_id, comment) => {
        const shouldDelete = window.confirm("コメントを削除します。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("note_record.comment.destroy", { note_record: note_record_id, comment: comment }), {
                preserveScroll: true,
            });
        }
    };
    
    return (
        <div>
            {comments && comments.length > 0 && (
                <div className="sm:w-5/6 max-h-[500px] px-2 sm:px-0 m-auto border-y border-slate-400 overflow-y-auto">
                    {comments.map((comment) => { return (
                        <div className="border-b border-slate-300 p-3 flex">
                            <div className="flex-none">
                                <UserIcon user={comment.user} imgClassName="w-8 h-8"/>
                            </div>
                            <div className="flex-auto px-3 py-1">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <Link 
                                            href={route("user.show", comment.user.id)}
                                            className="mr-5"
                                        >
                                            {comment.user.name}
                                        </Link>
                                        <div className="hidden sm:block">{comment.created_at}</div>
                                    </div>
                                    {comment.user.id === auth.user.id && (
                                        study_record_id ? (
                                            <button 
                                                className="underline" 
                                                onClick={() => handleStudyRecordCommentDelete(study_record_id, comment.id)}
                                                process={processing} 
                                            >
                                                削除する
                                            </button>
                                        ) : (
                                            <button 
                                                className="underline" 
                                                onClick={() => handleNoteRecordCommentDelete(note_record_id, comment.id)}
                                                process={processing} 
                                            >
                                                削除する
                                            </button>
                                        )
                                    )}
                                </div>
                                <div className="py-5 whitespace-pre-wrap break-all">
                                    {comment.body}
                                </div>
                                <div className="flex sm:hidden justify-end">
                                    {comment.created_at}
                                </div>
                            </div>
                        </div>
                    ); })}
                </div>
            )}
        </div>
    );
}