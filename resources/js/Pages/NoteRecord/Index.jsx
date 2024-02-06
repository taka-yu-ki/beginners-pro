import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import GoalTimeBarChart from "@/Components/GoalTimeBarChart";
import GoalText from "@/Components/GoalText";
import NoteRecordsTimeLine from "@/Components/NoteRecordsTimeLine";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        ノート 一覧
                    </div>
                    <Link href={route("note_record.create")}>
                        <PrimaryButton type="button">新規作成</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Note_records Index" />
            <div className="pt-20 pb-10">
                <GoalText goal_text={props.auth.user.goal_text} />
                <GoalTimeBarChart week_time={props.week_time} goal_time={props.auth.user.goal_time}/>
            </div>
            <div className="pt-10 pb-20">
                <div className="flex justify-center mb-5">
                    <div className="px-4 py-2 bg-blue-300 text-white rounded-l-md cursor-pointer">
                        フォロー中
                    </div>
                    <Link href={route("note_record.community")} preserveScroll>
                        <div className="px-4 py-2 bg-blue-500 text-white rounded-r-md cursor-pointer">
                            全ユーザー
                        </div>
                    </Link>
                </div>
                <NoteRecordsTimeLine 
                    note_records={props.note_records}
                />
            </div>
        </AuthenticatedLayout>
    );
}