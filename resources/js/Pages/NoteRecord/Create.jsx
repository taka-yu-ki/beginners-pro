import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import LexicalEditor from "@/Components/LexicalEditor";

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        date: "",
        title: "",
        body: "",
        category_ids: [],
    });
    
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
        post(route("note_record.store"));
    };
    
  return (
    <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={
            <div className="flex justify-between">
                <div className="font-semibold text-xl text-gray-800">
                    ノート 作成
                </div>
                <Link
                    href={route("note_record.index")}
                    className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    一覧に戻る
                </Link>
            </div>
        }
    >
        <Head title="Note_records Create" />
        <div className="py-20">
            <div className="w-5/6 m-auto">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
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
                                />
                                
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel htmlFor="title" value="タイトル" />
                                
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={handleChange}
                                />
                                
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="category" value="カテゴリー（複数選択可）" />
                                <select
                                    id="category"
                                    name="category_ids"
                                    value={data.category_ids}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={handleChange}
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
                                    onChange={handleBodyChange} 
                                    isEditable={true}
                                />
                                
                                <InputError message={errors.body} className="mt-2" />
                            </div>
                            
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton processing={processing}>
                                    作成
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