import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import BarChartComponent from "@/Components/BarChartComponent";
import PieChartComponent from "@/Components/PieChartComponent";
import GoalTimeBarChart from "@/Components/GoalTimeBarChart";
import GoalText from "@/Components/GoalText";
import StudyRecordsTimeLine from "@/Components/StudyRecordsTimeLine";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        学習記録 一覧
                    </div>
                    <Link href={route("study_record.create")}>
                        <PrimaryButton type="button">新規作成</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Study_records Index" />
            <div className="space-y-10 sm:space-y-20">
                <GoalText goal_text={props.auth.user.goal_text} />
                <GoalTimeBarChart week_time={props.week_time} goal_time={props.auth.user.goal_time} />
            </div>
            <div className="sm:w-5/6 m-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 lg:gap-4">
            </div>
            <div>
                <div className="flex justify-center pb-5">
                    <div className="px-4 py-2 bg-blue-300 text-white rounded-l-md cursor-pointer">
                        フォロー中
                    </div>
                    <Link href={route("study_record.community")} preserveScroll>
                        <div className="px-4 py-2 bg-blue-500 text-white rounded-r-md cursor-pointer hover:bg-blue-600">
                            全ユーザー
                        </div>
                    </Link>
                </div>
                <StudyRecordsTimeLine 
                    is_display_time={true}
                    today_time={props.today_time}
                    month_time={props.month_time}
                    total_time={props.total_time}
                    study_records={props.study_records}
                />
            </div>
        </AuthenticatedLayout>
    );
}