import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, useRemember } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import StudyRecordsTimeLine from "@/Components/StudyRecordsTimeLine";
import NoteRecordsTimeLine from "@/Components/NoteRecordsTimeLine";

export default function Show(props) {
    const { delete: destroy, post, processing } = useForm();
    const [selectedTab, setSelectedTab] = useRemember("study_records");
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    
    const handleBack = () => {
        window.history.back();
    };
    
    const handleFollow = async (id) => {
        await post(route("user.follow", id));
    };

    const handleUnfollow = async (id) => {
        await destroy(route("user.unfollow", id));
    };
    
    const isfollowed = () => props.user.followers.some(follower => follower.id === props.auth.user.id);
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        ユーザー
                    </div>
                    <Link
                        onClick={handleBack}
                        className="font-semibold text-gray-600 underline decoration-solid hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        戻る
                    </Link>
                </div>
            }
        >
            <Head title="User Show" />
            <div className="pt-20 pb-10">
                <div className="w-5/6 m-auto bg-white shadow-sm rounded-lg">
                    <div className="flex items-center p-10 border-b">
                        <img
                            className="w-16 h-16 rounded-full ring-2 ring-gray-100"
                            src={props.user.image_url ? props.user.image_url : "/images/user_icon.png"}
                            alt=""
                        />
                        <div className="flex-auto ml-5 text-2xl">{props.user.name}</div>
                        {isfollowed() ? ( 
                            <PrimaryButton onClick={() => handleUnfollow(props.user.id)} processing={processing}>フォローを外す</PrimaryButton>
                        ) : (
                            <PrimaryButton onClick={() => handleFollow(props.user.id)} processing={processing}>フォローする</PrimaryButton>
                        )}
                    </div>
                    <div className="flex justify-evenly">
                        <Link 
                            href={route("user.followings.index", props.user.id)}
                            className="px-10 py-1 hover:bg-slate-50"
                        >
                            {props.following_count} Followings
                        </Link>
                        <Link 
                            href={route("user.followers.index", props.user.id)}
                            className="px-10 py-1 hover:bg-slate-50"
                        >
                            {props.follower_count} Followers
                        </Link>
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-20">
                <div className="flex justify-start w-5/6 m-auto">
                    <label className={`px-4 py-2 ml-10 mr-3 rounded-t-md ${selectedTab === "study_records" ? "bg-gray-200" : "bg-white text-gray-600"}`}>
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
        </AuthenticatedLayout>
    );
}