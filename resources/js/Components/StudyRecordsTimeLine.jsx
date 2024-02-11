import { Link } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";
import TimeFormatter from "@/Components/TimeFormatter";

export default function StudyRecordsTimeLine({is_display_time = false, today_time, month_time, total_time, study_records, user}) {
    return (
        <div className="w-5/6 px-2 py-10 m-auto bg-gray-200 rounded-lg">
            {is_display_time && (
                <div className="flex justify-between px-10 pb-10 text-center">
                    <div className="w-1/4">
                        <div className="p-2 border-y border-black">
                            今日
                        </div>
                        <div className="px-10 py-5 text-lg">
                            <TimeFormatter time={today_time} />
                        </div>                    
                    </div>
                    <div className="w-1/4">
                        <div className="p-2 border-y border-black">
                            今月
                        </div>
                        <div className="px-10 py-5 text-lg">
                            <TimeFormatter time={month_time} />
                        </div>                    
                    </div>
                    <div className="w-1/4">
                        <div className="p-2 border-y border-black">
                            累計
                        </div>
                        <div className="px-10 py-5 text-lg">
                            <TimeFormatter time={total_time} />
                        </div>                    
                    </div>
                </div>
            )}
            <div className="text-center">タイムライン</div>
            <div className="border-y border-gray-500 overflow-y-auto max-h-[1000px]">
                {study_records.map((study_record) => { return (
                    <Link 
                        key={study_record.id}
                        href={route("study_record.show", study_record.id)}
                    >
                        <div className="px-3 py-5 bg-white border-y hover:bg-slate-50">
                            <div className="flex items-center text-sm font-bold">
                                {user ? (
                                    <UserIcon 
                                        user={user} 
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{user.name}</div>
                                        }
                                    />
                                ) : (
                                    <UserIcon 
                                        user={study_record.user} 
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{study_record.user.name}</div>
                                        }
                                    />
                                )}
                                <div className="ml-5">{study_record.date}</div>
                                <div className="px-2 py-1 ml-5 bg-lime-200 text-black text-sm rounded-full">{study_record.category.name}</div>
                            </div>
                            <div className="p-3 mt-3 flex justify-evenly font-bold text-center border rounded-md">
                                <div>
                                    時間：<TimeFormatter time={study_record.time} />
                                </div>
                                <div>{study_record.title}</div>
                            </div>
                        </div>
                    </Link>
                ); })}                        
            </div>
        </div>
    );
}