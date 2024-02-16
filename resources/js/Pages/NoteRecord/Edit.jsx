import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { Head, Link, useForm, useRemember } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import LexicalEditor from "@/Components/LexicalEditor";
import { format } from "date-fns";

export default function Create(props) {
    const { data, setData, patch, processing, errors } = useForm({
        date: props.note_record.date,
        title: props.note_record.title,
        body: "",
        category_ids: props.note_record.categories.map((category) => category.id),
    });
    
    const [titleLength, setTitleLength] = useRemember(0);
    const maxTitleLength = 50;
    
    useEffect(() => {
        setTitleLength(data.title.length);
    }, [data.title]);

    const today = new Date();
    const todayString = format(today, "yyyy-MM-dd");
    
    const handleChange = (event) => {
        if (event.target.name === "category_ids") {
            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
            setData("category_ids", selectedOptions);
        } else {
            setData(event.target.name, event.target.value);
        }
    };
    
    const handleBodyChange = (contentAsJSON) => {
        setData("body", contentAsJSON);
    };
    
    const submit = (e) => {
        e.preventDefault();
        patch(route("note_record.update", props.note_record.id));
    };
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        ノート 編集
                    </div>
                    <Link
                        href={route("note_record.show", props.note_record.id)}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </Link>
                </div>
            }
        >
            <Head title="Note_records Edit" />
            <div>
                <div className="sm:w-5/6 m-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <InputError errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="date" value="日付" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required
                                        max={todayString}
                                    />
                                    
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <InputLabel htmlFor="title" value="タイトル" />
                                        <div>{titleLength} / {maxTitleLength}</div>
                                    </div>
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                        required
                                        maxlength={maxTitleLength}
                                    />
                                    
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel htmlFor="category" value="カテゴリー" />
                                    <select
                                        id="category"
                                        name="category_ids"
                                        value={data.category_ids}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={handleChange}
                                        required
                                        multiple
                                    >
                                        {props.categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                
                                    <InputError message={errors.category} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <div>内容</div>
                                    <LexicalEditor
                                        id="body"
                                        data={props.note_record.body} 
                                        onChange={handleBodyChange} 
                                        isEditable={true}
                                    />
                                    
                                    <InputError message={errors.body} className="mt-2" />
                                </div>
                                
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton processing={processing}>
                                        更新
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>          
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}