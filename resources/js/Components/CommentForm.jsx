import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CommentForm({study_record_id, note_record_id}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: "",
    });
    
    const [textLength, setTextLength] = useState(0);
    const maxTextLength = 50;
    
    useEffect(() => {
        setTextLength(data.body.length);
    }, [data.body]);
    
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    
    const StudyRecordSubmit = (e) => {
        e.preventDefault();
        post(route("study_record.comment.store", study_record_id), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };
    
    const NoteRecordSubmit = (e) => {
        e.preventDefault();
        post(route("note_record.comment.store", note_record_id), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="px-2 sm:px-0 sm:w-5/6 mb-5 m-auto">
            <form onSubmit={study_record_id ? StudyRecordSubmit : NoteRecordSubmit}>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <InputLabel htmlFor="body" value="コメント" />
                        <div>{textLength} / {maxTextLength}</div>
                    </div>
                    <textarea
                        id="body"
                        name="body"
                        value={data.body}
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
    );
}