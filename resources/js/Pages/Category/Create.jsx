import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        color: "#000000",
    });
    
    const [nameLength, setNameLength] = useState(0);
    const maxNameLength = 20;
    
    useEffect(() => {
        setNameLength(data.name.length);
    }, [data.name]);
    
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route("category.store"));
    };
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        カテゴリー 作成
                    </div>
                    <Link
                        href={route("category.index")}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        一覧に戻る
                    </Link>
                </div>
            }
        >
            <Head title="Category Create" />
            
            <div>
                <div className="sm:w-5/6 m-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <InputError errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <div className="flex justify-between">
                                        <InputLabel htmlFor="name" value="カテゴリー名" />
                                        <div>{nameLength} / {maxNameLength}</div>
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required
                                        maxlength={maxNameLength}
                                    />
                                    
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel htmlFor="color" value="カラー" />
                                    <TextInput
                                        id="color"
                                        type="color"
                                        name="color"
                                        value={data.color}
                                        className="mt-1 block w-2/5"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required
                                        pattern="^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
                                    />
                                    
                                    <InputError message={errors.color} className="mt-2" />
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