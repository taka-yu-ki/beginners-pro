import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import LexicalEditor from "@/Components/LexicalEditor";
import { format } from "date-fns";

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        date: "",
        time: "",
        title: "",
        body: "",
        category_id: "",
    });

    const today = new Date();
    const todayString = format(today, "yyyy-MM-dd");
    
    const convertMinutesToTime = (time) => {
        const hours = String(Math.floor(time / 60)).padStart(2, "0");
        const minutes = String(time % 60).padStart(2, "0");
        const formatted_time = hours + ":" + minutes;
        
        return formatted_time;
    };
    
    const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const formatted_time = (hours * 60) + minutes;
        setData("time", formatted_time);
    };

    const [titleLength, setTitleLength] = useState(0);
    const maxTitleLength = 50;
    
    useEffect(() => {
        setTitleLength(data.title.length);
    }, [data.title]);
    
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    
    const handleTimeChange = (event) => {
        convertTimeToMinutes(event.target.value);
    };

    const handleBodyChange = (contentAsJSON) => {
        setData("body", contentAsJSON);
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route("study_record.store"));
    };
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        学習記録 作成
                    </div>
                    <Link
                        href={route("study_record.index")}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        一覧に戻る
                    </Link>
                </div>
            }
        >
            <Head title="Study_records Create" />
            
            <div>
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
                                        required
                                        max={todayString}
                                    />
                                    
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel htmlFor="time" value="時間" />
                                    <TextInput
                                        id="time"
                                        type="time"
                                        name="time"
                                        value={convertMinutesToTime((data.time))}
                                        className="mt-1 block w-full"
                                        onChange={handleTimeChange}
                                        required
                                        min="00:00"
                                        max="23:59"
                                    />
                                    
                                    <InputError message={errors.time} className="mt-2" />
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
                                    <div className="flex">
                                        <InputLabel htmlFor="category" value="カテゴリー" />
                                        <Link 
                                            href={route("category.create")}
                                            className="ml-5 text-sm text-gray-700 underline"
                                        >
                                            ＋ カテゴリーを追加する
                                        </Link>
                                    </div>
                                    <select
                                        id="category"
                                        name="category_id"
                                        value={data.category_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={handleChange}
                                        required
                                        maxlength="20"
                                    >
                                        <option value="">--カテゴリーを選んでください--</option>
                                        {props.categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                
                                    <InputError message={errors.category_id} className="mt-2" />
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