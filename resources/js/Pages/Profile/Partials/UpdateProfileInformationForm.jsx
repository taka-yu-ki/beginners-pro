import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image: "",
        delete_image: false,
        text: user.text,
        goal_text: user.goal_text,
        goal_time: user.goal_time,
    });
    
    const imagePreview = (e) => {
        if (e.target.files.length > 0) {
            let src = URL.createObjectURL(e.target.files[0]);
            document.getElementById("preview").src = src;
            setData("image", e.target.files[0]);
        }
    };
    
    const deleteImage = () => {
        const shouldDelete = window.confirm("プロフィール画像を削除しますか？");
        
        if (shouldDelete) {
            setData("delete_image", true);

            post(
                route("profile.update"),
                {
                    _method: "PATCH",
                    ...data.delete_image,
                },
            );
            
            document.getElementById("preview").src = "/images/user_icon.png";
        }
    };
    
    const [textLength, setTextLength] = useState(0);
    const [goalTextLength, setGoalTextLength] = useState(0);
    const maxTextLength = 500;
    const maxGoalTextLength = 100;
    
    useEffect(() => {
        setTextLength(data?.text?.length);
        setGoalTextLength(data?.goal_text?.length);
    }, [data?.text, data?.goal_text]);
    
    const convertMinutesToHours = (time) => {
        const hours = String(Math.floor(time / 60));

        return hours;
    };
    
    const convertHoursToMinutes = (time) => {
        const minutes = parseFloat(time) * 60;
        setData("goal_time", minutes);
    };
    
    const handleTimeChange = (event) => {
        convertHoursToMinutes(event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();
        
        post(
            route("profile.update"),
            {
                _method: "PATCH",
                ...data,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">プロフィール情報</h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel>プロフィール画像（1MB以内）</InputLabel>
                    <div className="mt-1 flex items-center">
                        <img
                            id="preview"
                            className="w-16 h-16 mr-3 rounded-full ring-2 ring-gray-50"
                            src={user.image_url ? user.image_url : "/images/user_icon.png"}
                            alt=""
                        />
                        <InputLabel
                            htmlFor="image"
                            className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            画像を選択
                        </InputLabel>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={imagePreview}
                            className="hidden"
                        />
                        {user.image_url && (
                            <button
                                type="submit"
                                className="px-4 py-2 ml-3 rounded-md border border-gray-300 text-sm font-medium text-red-700 shadow-sm hover:bg-gray-50 hover:text-red-800 "
                                onClick={deleteImage}
                            >
                                画像を削除する
                            </button>
                        )}
                    </div>
                    
                    <InputError className="mt-2" message={errors.image} />
                    <InputError className="mt-2" message={errors.delete_image} />
                </div>
                
                <div>
                    <InputLabel htmlFor="name" value="名前" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        maxlength="255"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                
                <div>
                    <div className="flex justify-between">
                        <InputLabel htmlFor="text" value="自己紹介文" />
                        <div>{textLength} / {maxTextLength}</div>
                    </div>
                    <textarea
                        id="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.text}
                        onChange={(e) => setData("text", e.target.value)}
                        isFocused
                        rows={5}
                        maxlength={maxTextLength}
                    />

                    <InputError className="mt-2" message={errors.text} />
                </div>
                
                <div>
                    <div className="flex justify-between">
                        <InputLabel htmlFor="goal_text" value="目標" />
                        <div>{goalTextLength} / {maxGoalTextLength}</div>
                    </div>
                    <TextInput
                        id="goal_text"
                        className="mt-1 block w-full"
                        value={data.goal_text}
                        onChange={(e) => setData("goal_text", e.target.value)}
                        isFocused
                        maxlength={maxGoalTextLength}
                    />

                    <InputError className="mt-2" message={errors.goal_text} />
                </div>
                
                <div>
                    <InputLabel htmlFor="goal_time" value="週の目標時間（時間）" />
                    <TextInput
                        id="goal_time"
                        type="number"
                        className="mt-1 block w-full"
                        value={convertMinutesToHours(data.goal_time)}
                        onChange={handleTimeChange}
                        isFocused
                        max="168"
                    />

                    <InputError className="mt-2" message={errors.goal_time} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            メールアドレスが未確認です。
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                こちらをクリックして確認メールを再送信してください。
                            </Link>
                        </p>
                
                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                新しい確認リンクがメールアドレスに送信されました。
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">保存しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}