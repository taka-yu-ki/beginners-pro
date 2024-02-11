import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import BarChartComponent from "@/Components/BarChartComponent";
import PieChartComponent from "@/Components/PieChartComponent";
import GoalTimeBarChart from "@/Components/GoalTimeBarChart";
import Pagination from "@/Components/Pagination";
import GoalText from "@/Components/GoalText";
import StudyRecordsTimeLine from "@/Components/StudyRecordsTimeLine";
import TimeFormatter from "@/Components/TimeFormatter";

export default function Community(props) {
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
            <Head title="Study_records Community" />
            <div className="pt-20 pb-10">
                <GoalText goal_text={props.auth.user.goal_text} />
                <GoalTimeBarChart week_time={props.week_time} goal_time={props.auth.user.goal_time}/>
            </div>
            <div className="py-10">
                <div className="w-5/6 m-auto grid grid-cols-2 gap-4">
                    <div className="h-96 p-5 bg-white rounded-md">
                        <BarChartComponent data={props.bar_chart_week.data} categories={props.categories}/>
                        <Pagination paginator={props.bar_chart_week}/>
                    </div>
                    {props.pie_chart_data.length !== 0 ? (
                        <div className="h-96 p-5 bg-white rounded-md">
                            <PieChartComponent data={props.pie_chart_data}/>
                            <div className="h-1/2 overflow-y-scroll">
                                <table className="w-full table-fixed">
                                    <thead className="sticky top-0">
                                        <tr className="bg-gray-300">
                                            <th className="py-2 px-4 font-normal">カテゴリー</th>
                                            <th className="py-2 px-4 font-normal">時間</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.pie_chart_data.map((data, index) => (
                                            <tr key={index} style={{ color: data.color }} className="border text-center">
                                                <td className="py-2 px-4 font-medium">{data.name}</td>
                                                <td className="py-2 px-4 font-medium">
                                                    <TimeFormatter time={data.time} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="h-96 p-5 bg-white rounded-md flex items-center justify-center">
                                データがありません
                        </div>
                    )}
                </div>
            </div>
            <div className="pt-10 pb-20">
                <div className="flex justify-center pb-5">
                    <Link href={route("study_record.index")} preserveScroll>
                        <div className="px-4 py-2 bg-blue-500 text-white rounded-l-md cursor-pointer hover:bg-blue-600">
                            フォロー中
                        </div>
                    </Link>
                    <div className="px-4 py-2 bg-blue-300 text-white rounded-r-md cursor-pointer">
                        全ユーザー
                    </div>
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