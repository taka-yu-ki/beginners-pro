import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import StudyRecordsTimeLine from "@/Components/StudyRecordsTimeLine";
import NoteRecordsTimeLine from "@/Components/NoteRecordsTimeLine";

export default function Show(props) {
    const { delete: destroy, post, processing } = useForm();
    const [selectedTab, setSelectedTab] = useState("study_records");
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    
    const handleFollow = (id) => {
        post(route("user.follow", id));
    };

    const handleUnfollow = (id) => {
        destroy(route("user.unfollow", id));
    };
    
    const isfollowed = () => props.user.followers.some(follower => follower.id === props.auth.user.id);

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
                        ユーザー
                    </div>
                    <button
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </button>
                </div>
            }
        >
            <Head title="User Show" />
            
            <div>
                <div className="sm:w-5/6 m-auto bg-white shadow-sm sm:rounded-lg">
                    <div className="flex items-center px-5 sm:p-10 py-10">
                        <img
                            className="w-16 h-16 rounded-full ring-2 ring-gray-100"
                            src={props.user.image_url ? props.user.image_url : "/images/user_icon.png"}
                            alt=""
                        />
                        <div className="flex-auto ml-5 text-2xl">{props.user.name}</div>
                        {props.user.id !== props.auth.user.id && (
                            <div className="hidden sm:block">
                                {isfollowed() ? ( 
                                    <PrimaryButton onClick={() => handleUnfollow(props.user.id)} processing={processing}>フォローを外す</PrimaryButton>
                                ) : (
                                    <PrimaryButton onClick={() => handleFollow(props.user.id)} processing={processing}>フォローする</PrimaryButton>
                                )}
                            </div>
                        )}
                    </div>
                    {props.user.text && (
                    <div className="border-t">
                        <div className="max-h-36 sm:max-h-48 py-5 mx-5 sm:mx-10 overflow-y-auto whitespace-pre-wrap break-words">
                            {props.user.text}
                        </div>
                    </div>
                    )}
                    <div className="flex justify-evenly border-t">
                        <Link 
                            href={route("user.followings.index", props.user.id)}
                            className="px-2 sm:px-10 py-1 hover:bg-slate-50"
                        >
                            {props.following_count} フォロー
                        </Link>
                        <Link 
                            href={route("user.followers.index", props.user.id)}
                            className="px-2 sm:px-10 py-1 hover:bg-slate-50"
                        >
                            {props.follower_count} フォロワー
                        </Link>
                    </div>
                </div>
            </div>
            <div className="pb-10 sm:pb-0">
                <div className="flex justify-start sm:w-5/6 m-auto">
                    <label className={`px-4 py-2 ml-5 sm:ml-10 mr-3 rounded-t-md ${selectedTab === "study_records" ? "bg-gray-200" : "bg-white text-gray-600"}`}>
                        <input
                            type="radio"
                            value="study_records"evenly
                            checked={selectedTab === "study_records"}
                            onChange={() => handleTabChange("study_records")}
                            className ="hidden"
                        />
                        学習記録
                    </label>
                    <label className={`px-4 py-2 rounded-t-md ${selectedTab === "note_records" ? "bg-gray-200" : "bg-white text-gray-600"}`}>
                        <input
                            type="radio"
                            value="note_records"
                            checked={selectedTab === "note_records"}
                            onChange={() => handleTabChange("note_records")}
                            className="hidden"
                        />
                        ノート
                    </label>
                </div>
                {selectedTab === "study_records" ? (
                    <StudyRecordsTimeLine 
                        study_records={props.user.study_records}
                        user={props.user}
                    />
                ) : (
                    <NoteRecordsTimeLine 
                        note_records={props.user.note_records}
                        user={props.user}
                    />
                )}
            </div>
            {props.user.id !== props.auth.user.id && (
                <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 max-w-screen-2xl">
                    <div className="flex justify-center p-5 m-auto bg-slate-50 border-t">
                        {isfollowed() ? ( 
                            <PrimaryButton onClick={() => handleUnfollow(props.user.id)} processing={processing}>フォローを外す</PrimaryButton>
                        ) : (
                            <PrimaryButton onClick={() => handleFollow(props.user.id)} processing={processing}>フォローする</PrimaryButton>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}