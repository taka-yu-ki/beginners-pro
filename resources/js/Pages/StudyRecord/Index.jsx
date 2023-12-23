import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";

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
    }
    
    return (
        <AuthenticatedLayout
          auth={props.auth}
          errors={props.errors}
          header={
            <div>
                <Link href={route("study_record.create")}>
                    <PrimaryButton type="button">新規作成</PrimaryButton>
                </Link>
            </div>
          }
        >
            <Head title="Study_records Index" />
            <div className="py-10">
                <div className="w-5/6 m-auto my-5 text-center">
                    <div className="p-3 bg-cyan-200 rounded-t-lg">目標</div>
                    <div className="p-5 bg-slate-50 rounded-b-lg">{props.auth.user.goal_text}</div>
                </div>
                <div className="w-5/6 m-auto my-5 text-center">
                    <div className="p-3 bg-cyan-200 rounded-t-lg">目標時間</div>
                    <div className="p-5 bg-slate-50 rounded-b-lg">{props.auth.user.goal_time}</div>
                </div>
            </div>
            <div className="py-20">
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
                    {[...props.study_records].sort((a, b) => new Date(b.date) - new Date(a.date)).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map((study_record) => { return (
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
                                    <div className="flex">{study_record.categories.map((category) => <div className="bg-lime-300 text-black rounded-full px-2 py-1 mx-2">{category.name}</div>)}</div>
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