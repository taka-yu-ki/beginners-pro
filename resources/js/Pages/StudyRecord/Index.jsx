import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import BarChartComponent from "@/Components/BarChartComponent";
import PieChartComponent from "@/Components/PieChartComponent";
import GoalTimeBarChart from "@/Components/GoalTimeBarChart";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    
    const format_time = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
      
        if (hours === 0) {
            return `${minutes} 分`;
        } 
        
        if (minutes === 0) {
            return `${hours} 時間`;
        }
        
        return `${hours} 時間 ${minutes} 分`;
    };
    
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
            <div className="py-10">
                {props.auth.user.goal_text ? (
                    <div className="w-5/6 m-auto mb-10 bg-white rounded-md overflow-hidden text-center">
                        <div className="p-2 bg-gray-300">目標</div>
                        <div className="p-5 text-xl font-bold">{props.auth.user.goal_text}</div>
                    </div>
                ) : (
                    <div className="w-5/6 m-auto mb-10 bg-white rounded-md overflow-hidden text-center">
                        <div className="p-2 bg-gray-300">目標</div>
                        <div className="p-5">目標を設定してください</div>
                    </div>
                )}
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
                                                <td className="py-2 px-4 font-medium">{format_time(data.time)}</td>
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
            <div className="py-20">
                <div className="flex justify-center mb-5">
                    <div className="px-4 py-2 bg-blue-300 text-white rounded-l-md cursor-pointer">
                        フォロー中
                    </div>
                    <Link href={route('study_record.community')} preserveScroll>
                        <div className="px-4 py-2 bg-blue-500 text-white rounded-r-md cursor-pointer">
                            全ユーザー
                        </div>
                    </Link>
                </div>
                <div className="w-5/6 m-auto p-10 bg-slate-50 rounded-lg">
                    <div className="flex justify-between mb-10 text-center">
                        <div className="w-1/4">
                            <div className="bg-cyan-300 p-2 rounded-t-lg">
                                今日
                            </div>
                            <div className="bg-white px-10 py-5 rounded-b-lg">
                                {format_time(props.today_time)}
                            </div>                    
                        </div>
                        <div className="w-1/4">
                            <div className="bg-cyan-300 p-2 rounded-t-lg">
                                今月
                            </div>
                            <div className="bg-white px-10 py-5 rounded-b-lg">
                                {format_time(props.month_time)}
                            </div>                    
                        </div>
                        <div className="w-1/4">
                            <div className="bg-cyan-300 p-2 rounded-t-lg text-center">
                                累計
                            </div>
                            <div className="bg-white px-10 py-5 rounded-b-lg">
                                {format_time(props.total_time)}
                            </div>                    
                        </div>
                    </div>
                    <div className="text-center">タイムライン</div>
                    <div className="p-6 bg-white border-t border-gray-200 overflow-y-auto" style={{ maxHeight: '500px' }}>
                        {props.study_records.map((study_record) => { return (
                            <Link key={study_record.id} href={route("study_record.show", study_record.id)}>
                                <div className="bg-red-500 m-5 sm:rounded-lg">
                                    <div className="flex place-items-center text-white text-sm font-bold pt-3 px-3">
                                        <Link href={route("user.show", study_record.user.id)}>
                                            <img
                                                className="relative w-8 h-8 rounded-full ring-2 ring-white"
                                                src={study_record.user.image_url ? study_record.user.image_url : '/images/user_icon.png'}
                                                alt=""
                                            />
                                        </Link>
                                        <div className="mx-2">{study_record.user.name}</div>
                                        <div className="mx-2">{study_record.date}</div>
                                        <div className="bg-lime-300 text-black rounded-full px-2 py-1 mx-2">{study_record.category.name}</div>
                                    </div>
                                    <div className="pt-1 pb-5 flex justify-evenly">
                                        <div className="text-white text-lg font-bold text-center">時間：{format_time(study_record.time)}</div>
                                        <div className="text-white text-lg font-bold text-center">{study_record.title}</div>
                                    </div>
                                </div>
                            </Link>
                        ); })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}